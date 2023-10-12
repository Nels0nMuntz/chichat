import { ErrorCode, ErrorException } from "../shared";
import { IUserDocument, IUserModel, IUserSchema, userModel } from "../schemas";
import { BaseRepository } from "./base.repository";
import { UpdateUserDto } from "src/dtos";

export type UpdateOneDocument = Omit<UpdateUserDto, "userId">

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

    public updateOne = async (userId: string, doc: UpdateOneDocument) => {
        try {            
            return await this.model.findByIdAndUpdate(userId, doc)
        } catch (error) {
            console.log({ message: "Can not find user in DB", error });
            throw ErrorException.ServerError("Can not update user in DB");
        }
    }
};

export const userRepository = new UserRepository();