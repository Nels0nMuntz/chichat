import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { errorFormatter } from '../helpers';
import { IAuthSignUpRequest, IAuthSignInRequest, IAuthSignInResponse } from '../models';
import { AuthService } from '../services';
import { ErrorException, IRequest } from '../shared';


export class AuthController {

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
            const { refreshToken } = await this.service.signup(req.body);
            res.cookie("refreshToken", refreshToken, { 
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json({});
        } catch (error) {
            next(error);
        };
    }

    public signin = async (req: IRequest<IAuthSignInRequest>, res: Response<IAuthSignInResponse>, next: NextFunction) => {
        try {            
            const errors = validationResult(req).formatWith(errorFormatter);
            if(!errors.isEmpty()){
                const message = errors.array().map(({ msg, param }) => ({ msg, param }));
                throw ErrorException.BadRequestError("Validation error", message);
            };
            const tokens = await this.service.signin(req.body);
            res.cookie("refreshToken", tokens.refreshToken, { 
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            }); 
            res.setHeader("Authorization", "Bearer " + tokens.accessToken);
            return res.status(200).json({ accessToken: tokens.accessToken });
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

    public refresh = async (req: Request, res: Response<IAuthSignInResponse>, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies;
            const { accessToken } = await this.service.refresh(refreshToken);            
            res.header("Authorization", "Bearer " + accessToken);
            res.cookie("refreshToken", refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json({ accessToken });
        } catch (error) {
            next(error);
        }
    }

    public getUsers = async (req: Request, res: Response, next: NextFunction) => res.json({ users: [] })
};