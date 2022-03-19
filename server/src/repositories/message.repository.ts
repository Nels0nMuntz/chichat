import { BaseRepository } from "./base.repository";
import { IMessageDocument, messageModel } from "../schemas";
import { ErrorException } from "../shared";
import { CreateMessageRequestDto } from "../dtos";


export class MessageRepository extends BaseRepository<IMessageDocument>{
    constructor() {
        super(messageModel)
    }

    createOne = async (doc: CreateMessageRequestDto): Promise<IMessageDocument> => {
        try {
            return await this.model.create(doc);
        } catch (error) {
            throw ErrorException.ServerError("Can not create document in DB");
        }
    }

    delete = async (ids: Array<string>): Promise<void> => {
        try {
            await Promise.all(ids.map(async id => await this.model.findByIdAndDelete(id)));
        } catch (error: any) {
            throw ErrorException.ServerError(`Can not delete messages in DB`);
        };
    }
};