import { CreateDialogRequestDto } from "../dtos";
import { DialogRepository } from "../repositories";
import { IDialogDocument, IMessageDocument } from "../schemas";


export class DialogService {

    private repository: DialogRepository;

    constructor() {
        this.repository = new DialogRepository();
    }

    create = async (doc: CreateDialogRequestDto): Promise<IDialogDocument> => {
        return await this.repository.createOne({ ...doc });
    }

    getMessages = async (dialogId: string, part: number): Promise<Array<IMessageDocument>> => {
        const size = 10;
        const doc = await this.repository.findOne(
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