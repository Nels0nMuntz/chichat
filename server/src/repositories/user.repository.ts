import { ErrorCode, ErrorException } from "../shared";
import { IUserDocument, IUserModel, IUserSchema, userModel } from "../schemas";
import { BaseRepository } from "./base.repository";


export class UserRepository extends BaseRepository<IUserDocument> {

    constructor(){
        super(userModel)
    }

    public findOneByEmail = async (email: string): Promise<IUserDocument> => {
        try {
            return await this.model.findOne({ email })
        } catch (error) {
            console.log({ message: "Can not find user in DB", error });
            throw ErrorException.ServerError("Can not find user in DB");
        }
    };

    public findOneByPhoneNumber = async (phoneNumber: string): Promise<IUserDocument> => {
        try {
            return await this.model.findOne({ phoneNumber })
        } catch (error) {
            console.log({ message: "Can not find user in DB", error });
            throw ErrorException.ServerError("Can not find user in DB");
        }
    };
};

export const userRepository = new UserRepository();