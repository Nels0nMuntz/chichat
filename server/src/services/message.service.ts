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
        const  { dialogId, createdBy } = doc;
        const dialog = await this.dialogRepository.findById(dialogId);
        if(!dialog){
            throw ErrorException.BadRequestError("Invalid message data. Can not find dialog in DB");
        };
        const user = await this.userRepository.findById(createdBy);
        if(!user){
            throw ErrorException.BadRequestError("Invalid message data. Can not find user in DB");
        };
        const message = await this.messageRepository.createOne({ ...doc });
        this.dialogRepository.updateOne(dialogId, { $push: { messages: message._id } });
        return message;
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