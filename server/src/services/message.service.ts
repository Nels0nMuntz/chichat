import { IMessageDocument } from "../schemas";
import { CreateMessageRequestDto, UpdateMessageRequestDto } from "../dtos";
import { DialogRepository, MessageRepository, UserRepository } from "../repositories";
import { ErrorException } from "../shared";
import { UniqueId, IPaginationOptions } from "../models";


export class MessageService {

    private messageRepository: MessageRepository;
    private dialogRepository: DialogRepository;
    private userRepository: UserRepository;

    constructor() {
        this.messageRepository = new MessageRepository();
        this.dialogRepository = new DialogRepository();
        this.userRepository = new UserRepository();
    }

    create = async (doc: CreateMessageRequestDto): Promise<IMessageDocument> => {
        const { dialogId, createdBy } = doc;
        const dialog = await this.dialogRepository.findById(dialogId);
        if (!dialog) {
            throw ErrorException.BadRequestError("Invalid message data. Can not find dialog in DB");
        };
        const user = await this.userRepository.findById(createdBy);
        if (!user) {
            throw ErrorException.BadRequestError("Invalid message data. Can not find user in DB");
        };
        const message = await this.messageRepository.createOne({ ...doc });
        this.dialogRepository.updateOne(dialogId, { $push: { messages: message._id } });
        return message;
    }

    update = async (doc: UpdateMessageRequestDto): Promise<IMessageDocument> => {
        const { messageId, content } = doc;
        const message = await this.messageRepository.findById(messageId);
        if (!message) {
            throw ErrorException.BadRequestError("Invalid message data. Can not find message in DB");
        };
        return await this.messageRepository.updateOne(messageId, { content });
    }

    search = async (userId: string, query: string) => {

    }

    getMessages = async (dialogId: UniqueId, options: IPaginationOptions): Promise<Array<IMessageDocument>> => {
        const dialog = await this.dialogRepository.findById(dialogId);
        if (!dialog) {
            throw ErrorException.BadRequestError("Can not find dialog by ID in DB");
        };
        
        const allMessages = await this.messageRepository.find(
            { dialogId },
            null,
            {
                sort: { createdAt: -1 },
                // skip: options.limit * (options.page - 1),
            }
        );
        const limitedMessages = await this.messageRepository.find(
            { dialogId },
            null,
            {
                sort: { createdAt: -1 },
                limit: options.limit,
                skip: options.limit * (options.page - 1),
            }
        );

        console.log(dialogId)
        console.log({ allMessages: allMessages.length, limitedMessages: limitedMessages.length });        

        return limitedMessages;
    }

    deleteMany = async (messageIds: Array<string>): Promise<void> => {
        return await this.messageRepository.deleteMessages(messageIds);
    }
}