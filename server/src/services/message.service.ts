import { IMessageDocument } from "../schemas";
import { CreateMessageRequestDto, UpdateMessageRequestDto } from "../dtos";
import { DialogRepository, MessageRepository, UserRepository } from "../repositories";
import { ErrorException } from "../shared";


export class MessageService {

    private messageRepository: MessageRepository;
    private dialogRepository: DialogRepository;
    private userRepository: UserRepository;

    constructor(){
        this.messageRepository = new MessageRepository();
        this.dialogRepository = new DialogRepository();
        this.userRepository = new UserRepository();
    }

    create = async (doc: CreateMessageRequestDto): Promise<IMessageDocument> => {
        const dialog = await this.dialogRepository.findById(doc.dialogId);
        if(!dialog){
            throw ErrorException.BadRequestError("Invalid message data. Can not find dialog in DB");
        };
        const user = await this.userRepository.getOneById(doc.createdBy);
        if(!user){
            throw ErrorException.BadRequestError("Invalid message data. Can not find user in DB");
        };
        return await this.messageRepository.createOne({ ...doc });
    }

    update = async (doc: UpdateMessageRequestDto): Promise<IMessageDocument> => {
        const { messageId, content } = doc;
        const message = await this.messageRepository.findById(messageId);
        if(!message){
            throw ErrorException.BadRequestError("Invalid message data. Can not find message in DB");
        };
        return await this.messageRepository.updateOne(messageId, { content });
    }
}