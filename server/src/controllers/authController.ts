import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { errorFormatter } from '../helpers';
import { IAuthSignUpRequest, IAuthSignInRequest} from '../models';
import { AuthService } from '../services';
import { ErrorException, IRequest } from '../shared';

class AuthController {

    private service: AuthService;

    constructor(){
        this.service = new AuthService();
    }

    public signup = async (req: IRequest<IAuthSignUpRequest>, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req).formatWith(errorFormatter);
            if(!errors.isEmpty()){
                const message = errors.array().map(({ msg, param }) => ({ msg, param }));
                throw ErrorException.BadRequestError("Validation error", message);
            };

            const tokens = await this.service.signup(req.body);
            res.header("Authorization", "Bearer " + tokens.accessToken);
            res.cookie("refreshToken", tokens.refreshToken, { 
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json({});
        } catch (error) {
            next(error);
        }
    }

    public signin = async (req: IRequest<IAuthSignInRequest>, res: Response, next: NextFunction) => {
        try {
            const tokens = await this.service.signin(req.body);
            res.cookie("refreshToken", tokens.refreshToken, { 
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            }); 
            res.header("Authorization", "Bearer " + tokens.accessToken)
            return res.json({});
        } catch (error) {
            next(error);
        }
    }

    public signout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies;
            await this.service.signout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json({});
        } catch (error) {
            next(error);
        }
    }

    public activate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const activationLink = req.params.link;
            await this.service.activate(activationLink);
            return res.redirect(process.env.CLIENT_API);
        } catch (error) {
            next(error);
        }
    }

    public refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies;
            const tokens = await this.service.refresh(refreshToken);            
            res.header("Authorization", "Bearer " + tokens.accessToken);
            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json({});
        } catch (error) {
            next(error);
        }
    }

    public getUsers = async (req: Request, res: Response, next: NextFunction) => res.json({ users: [] })
};

export default AuthController;