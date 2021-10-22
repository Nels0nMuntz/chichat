import { UserRepository, DialogRepository } from "../repositories";
import { IUserDocument, IDialogPopulated } from "../schemas";
import { ErrorException } from "../shared";


export class UserService {

    private userRepository: UserRepository;
    private dialogRepository: DialogRepository;

    constructor(){
        this.userRepository = new UserRepository();
        this.dialogRepository = new DialogRepository();
    }

    getUserData = async (userId: string): Promise<IUserDocument> => {
        const isExists = await this.userRepository.exists({ id: userId });
        if(!isExists){
            throw ErrorException.BadRequestError("Can not find user by ID");
        };
        return await this.userRepository.findById(userId);
    }

    search = async (userId: string, query: string, internal: string): Promise<Array<IUserDocument>> => {
        const isExists = await this.userRepository.exists({ id: userId });
        if(!isExists){
            throw ErrorException.BadRequestError("Can not find user by ID");
        };

        let response: Array<IUserDocument> = [];

        const pattern = new RegExp(query, "i");
        const users = await this.userRepository.find(
            {
                $or: [
                    { firstName: pattern },
                    { lastName: pattern },
                    { phoneNumber: pattern },
                ]
            }
        );

        if(internal === "false"){
            response = users;
        }else{
            const dialogs: Array<IDialogPopulated> = await this.dialogRepository.find(
                {
                    $or: [
                        { member_1: userId },
                        { member_2: userId },
                    ],
                },
                null,
                {
                    populate: [
                        "member_1",
                        'member_2'
                    ]
                }
            );
            response = users.reduce((prev, curr) => {
                const isExists = dialogs.some(({ member_1, member_2 }) => curr.id === member_1.id || curr.id === member_2.id);
                return isExists ? [...prev, curr] : prev;
            }, [] as Array<IUserDocument>);
        };

        return response;
        
    }

};