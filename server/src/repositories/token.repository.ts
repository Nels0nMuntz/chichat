import { ITokenDocument, ITokenModel, tokenModel, ITokenSchema } from "../schemas/tokenModel";
import { ErrorException } from "../shared";


export class TokenRepository {

    private model: ITokenModel

    constructor(){
        this.model = tokenModel
    }

    public getOneById = async (userId: string): Promise<ITokenDocument> => {
        try {
            return await this.model.findById(userId);
        } catch (error) {
            console.log({ message: "Can not find refresh token in DB", error });
            throw ErrorException.ServerError("Can not find refresh token in DB");
        }
    }

    public getOneByToken = async (token: string): Promise<ITokenDocument> => {
        try {
            return await this.model.findOne({ refreshToken: token });
        } catch (error) {
            console.log({ message: "Can not find refresh token in DB", error });
            throw ErrorException.ServerError("Can not find refresh token in DB");
        }
    }

    public create = async (token: ITokenSchema): Promise<ITokenDocument> => {
        try {
            return await this.model.create(token);
        } catch (error) {
            console.log({ message: "Can not create refresh token in DB", error });
            throw ErrorException.ServerError("Can not create refresh token in DB");
        }
    }

    public deleteOne = async (token: string): Promise<void> => {
        try {
            await this.model.deleteOne({ refreshToken: token });      
        } catch (error) {
            console.log({ message: "Can not delete refresh token in DB", error });
            throw ErrorException.ServerError("Can not delete refresh token in DB");
        }
    }
}

export const tokenRepository = new TokenRepository();