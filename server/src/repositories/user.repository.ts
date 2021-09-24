import { ErrorCode, ErrorException } from "../shared";
import { IUserDocument, IUserModel, IUserSchema, userModel } from "../schemas";


export class UserRepository {

    private model: IUserModel;

    constructor() {
        this.model = userModel;
    };

    public getOneByEmail = async (email: string): Promise<IUserDocument> => {
        try {
            return await this.model.findOne({ email })
        } catch (error) {
            console.log({ message: "Can not find user in DB", error });
            throw ErrorException.ServerError("Can not find user in DB");
        }
    };

    public getOneByPhoneNumber = async (phoneNumber: string): Promise<IUserDocument> => {
        try {
            return await this.model.findOne({ phoneNumber })
        } catch (error) {
            console.log({ message: "Can not find user in DB", error });
            throw ErrorException.ServerError("Can not find user in DB");
        }
    };

    public getOneById = async (id: IUserDocument["_id"]): Promise<IUserDocument> => {
        try {
            return await this.model.findById(id);
        } catch (error) {
            console.log({ message: "Can not find user in DB", error });
            throw ErrorException.ServerError("Can not find user in DB");
        }
    };

    public create = async (user: IUserSchema): Promise<IUserDocument> => {
        try {
            return await this.model.create(user);
        } catch (error) {
            console.log({ message: "Can not create user in DB", error });
            throw ErrorException.ServerError("Can not create user in DB");
        }
    }

    public getOne = async (user: Partial<IUserSchema>) => {
        try {
            return await this.model.findOne(user);
        } catch (error) {
            console.log({ message: "Can not find user in DB", error });
            throw ErrorException.ServerError("Can not find user in DB");
        }
    }
};