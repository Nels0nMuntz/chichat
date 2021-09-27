import { ErrorException } from "../shared";
import { CreateDialogRequestDto } from "../dtos";
import { DialogRepository, UserRepository } from "../repositories";
import { IDialogDocument, IMessageDocument } from "../schemas";


export class DialogService {

    private dialogRepository: DialogRepository;
    private userRepository: UserRepository;

    constructor() {
        this.dialogRepository = new DialogRepository();
        this.userRepository = new UserRepository();
    }

    create = async (doc: CreateDialogRequestDto): Promise<IDialogDocument> => {
        const member1Doc = await this.userRepository.getOneById(doc.member_1);
        if(!member1Doc) {
            throw ErrorException.BadRequestError("Can not create new dialog. Member 1 is not exists");
        }
        const member2Doc = await this.userRepository.getOneById(doc.member_2);
        if(!member2Doc) {
            throw ErrorException.BadRequestError("Can not create new dialog. Member 2 is not exists");
        }
        const dialogsWithMember1 = await this.dialogRepository.find(
            {
                $or: [
                    { member_1: doc.member_1, member_2: doc.member_2 },
                    { member_1: doc.member_2, member_2: doc.member_1 },
                ]
            },
        );
        if (dialogsWithMember1.length) {
            throw ErrorException.BadRequestError("Can not create new dialog. Dialog is already exists");
        }
        return await this.dialogRepository.createOne({ ...doc });
    }

    getMessages = async (dialogId: string, part: number): Promise<Array<IMessageDocument>> => {
        const dialog = await this.dialogRepository.findById(dialogId);
        if(!dialog) {
            throw ErrorException.BadRequestError("Can not get messages. Dialog is not exists");
        };
        const size = 10;
        const doc = await this.dialogRepository.findOne(
            { _id: dialogId },
            { messages: 1 },
            {
                sort: { _createdAt: 'asc' },
                skip: part * size,
                limit: size,
                populate: 'messages',
            }
        );

        return doc.messages;
    }
};