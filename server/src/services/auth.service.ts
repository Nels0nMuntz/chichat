import { compare, hash } from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from "../repositories";
import { MailService, TokenService } from ".";
import { SignUpUserDto, SignInUserDto, TokenPayloadDto } from '../dtos'
import { ErrorCode, ErrorException } from "../shared";
import { IAuthSignUpRequest, IAuthSignInRequest } from "../models";


export class AuthService {

    private repository: UserRepository;
    private mailService: MailService;
    private tokenService: TokenService;

    constructor() {
        this.repository = new UserRepository();
        this.mailService = new MailService();
        this.tokenService = new TokenService();
    };

    public signup = async (body: IAuthSignUpRequest): Promise<{ accessToken: string, refreshToken: string }> => {
        const { email, firstName, lastName, phoneNumber, password } = new SignUpUserDto(body);
        const candidate = await this.repository.getOneByEmail(email);
        if (candidate) {
            throw ErrorException.BadRequestError("This user is already exists");
        };

        const hashPassword = await hash(password, 3);
        const activationId: string = uuidv4();
        const user = await this.repository.create({
            email,
            firstName,
            lastName,
            phoneNumber,
            password: hashPassword,
            passwordOrigin: password,
            isActivated: false,
            activationId,
        });

        const tokenPayload = new TokenPayloadDto(user);
        const tokens = this.tokenService.generateTokens({ ...tokenPayload });
        await this.tokenService.saveRefreshToken(user._id, tokens.refreshToken);
        // const activationLink: string = `${process.env.API_URL}/api/auth/activate/${activationId}`;
        // this.mailService.initTransporter();
        // await this.mailService.sendActivationMail(email, activationLink);

        return { ...tokens };
    }

    public signin = async (body: IAuthSignInRequest): Promise<{ accessToken: string, refreshToken: string }> => {
        const { email, password } = new SignInUserDto(body);
        const document = await this.repository.getOneByEmail(email);
        if (!document){
            throw ErrorException.BadRequestError("User does not exists", [{ param: "email", msg: "User does not exists" }]);
        }

        const isPassEqual = await compare(password, document.password);
        if (!isPassEqual) {
            throw ErrorException.BadRequestError("Paasword is incorrect", [{ param: "password", msg: "Paasword is incorrect" }]);
        }

        const tokenPayload = new TokenPayloadDto(document);
        const tokens = this.tokenService.generateTokens({ ...tokenPayload });
        await this.tokenService.saveRefreshToken(document._id, tokens.refreshToken);

        return { ...tokens };
    }

    public signout = async (refreshToken: string): Promise<void> => {
        return await this.tokenService.deleteRefreshToken(refreshToken);
    }

    public activate = async (activationId: string): Promise<void> => {
        const document = await this.repository.getOne({ activationId });
        if (!document) throw new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, "Activation link is incorrect");
        document.isActivated = true;
        await document.save();
    }

    public refresh = async (refreshToken: string): Promise<{ accessToken: string, refreshToken: string }> => {
        if (!refreshToken) {
            throw ErrorException.UnauthorizedError();
        }
        const receivedToken = this.tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await this.tokenService.getRefreshToken(refreshToken);

        if (!receivedToken || !tokenFromDB) {
            throw ErrorException.UnauthorizedError();
        }
        const document = await this.repository.getOneById(tokenFromDB.userId);

        const tokenPayload = new TokenPayloadDto(document);
        const tokens = this.tokenService.generateTokens({ ...tokenPayload });
        await this.tokenService.saveRefreshToken(document._id, tokens.refreshToken);

        return { ...tokens };
    }
};