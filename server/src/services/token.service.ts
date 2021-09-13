import jwt, { verify } from 'jsonwebtoken'
import { TokenPayloadDto } from '../dtos';
import { TokenRepository, tokenRepository } from '../repositories';
import { ITokenDocument } from '../schemas';


export class TokenService {

    private repository: TokenRepository

    constructor() {
        this.repository = tokenRepository;
    }

    public generateTokens = (payload: TokenPayloadDto) => {
        const {
            JWT_ACCESS_SECRET,
            JWT_REFRESH_SECRET,
            JWT_ACCESS_MAX_AGE,
            JWT_REFRESH_MAX_AGE,
        } = process.env;
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "20s" });
        // const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_MAX_AGE });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_MAX_AGE });
        return {
            accessToken,
            refreshToken
        };
    }

    public getRefreshToken = async (token: string): Promise<ITokenDocument> => {
        return await this.repository.getOneByToken(token);
    }

    public saveRefreshToken = async (userId: string, refreshToken: string): Promise<ITokenDocument> => {
        const documen = await this.repository.getOneById(userId);
        if (documen) {
            documen.refreshToken = refreshToken;
            return await documen.save();
        };
        return await this.repository.create({ userId, refreshToken });
    }

    public deleteRefreshToken = async (refreshToken: string): Promise<void> => {
        this.repository.deleteOne(refreshToken);
    }

    public validateAccessToken = (token: string) => {
        try {
            const res = verify(token, process.env.JWT_ACCESS_SECRET);
            return res
        } catch (error) {
            return null;
        }
    }

    public validateRefreshToken = (token: string) => {
        try {
            return verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (error) {
            return null;
        }
    }
};

export const tokenService = new TokenService();