import { ErrorException } from "../shared";
import { CreateDialogRequestDto } from "../dtos";
import { DialogRepository, UserRepository } from "../repositories";
import { IDialogDocument, IDialogPopulated, IMessageDocument } from "../schemas";


export class DialogService {

    private dialogRepository: DialogRepository;
    private userRepository: UserRepository;

    constructor() {
        this.dialogRepository = new DialogRepository();
        this.userRepository = new UserRepository();
    }

    create = async (doc: CreateDialogRequestDto): Promise<IDialogPopulated> => {
        const member1Doc = await this.userRepository.findById(doc.member_1);
        if (!member1Doc) {
            throw ErrorException.BadRequestError("Can not create new dialog. Member 1 is not exists");
        }
        const member2Doc = await this.userRepository.findById(doc.member_2);
        if (!member2Doc) {
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
        const createdDialog = await this.dialogRepository.createOne({ ...doc });
        const populatedDialog = createdDialog.populate([
            "member_1",
            "member_2",
            "messages",
        ]);
        return populatedDialog;
    }

    getAllMessages = async (dialogId: string, offset: number, limit: number): Promise<Array<IMessageDocument>> => {
        const dialog = await this.dialogRepository.findById(dialogId);
        if (!dialog) {
            throw ErrorException.BadRequestError("Can not get messages. Dialog is not exists");
        };
        const doc: IDialogPopulated = await this.dialogRepository.findOne(
            { _id: dialogId },
            null,
            { populate: 'messages' },
        );

        if (!doc) {
            throw ErrorException.ServerError("Can not find messages in DB")
        };

        const messages = doc.messages
            .sort((a, b) => (+new Date(b.updatedAt)) - (+new Date(a.updatedAt)))
            // .splice(offset)
            // .slice(0, limit)

        return messages;
    }

    getAllDialogs = async (userId: string): Promise<Array<IDialogPopulated>> => {
        const isUserExists = await this.userRepository.exists({ id: userId });
        if (!isUserExists) {
            throw ErrorException.BadRequestError("Can not get dialogs. User does not exists");
        };
        const dialogs = await this.dialogRepository.find(
            {
                $or: ([
                    { member_1: userId },
                    { member_2: userId },
                ])
            },
            null,
            {
                populate: [
                    "member_1",
                    "member_2",
                    "messages",
                ],
            }
        );

        return dialogs;
    }
};