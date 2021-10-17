import { UserRepository } from "../repositories";
import { IUserDocument } from "../schemas";
import { ErrorException } from "../shared";


export class UserService {

    private repository: UserRepository;

    constructor(){
        this.repository = new UserRepository();
    }

    getUserData = async (userId: string): Promise<IUserDocument> => {
        const isExists = await this.repository.exists({ id: userId });
        if(!isExists){
            throw ErrorException.BadRequestError("Can not find user by id");
        };
        return await this.repository.findById(userId);
    }

};