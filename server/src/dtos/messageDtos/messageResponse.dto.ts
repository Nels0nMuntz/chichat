import { IMessageContent, IMessageResponse } from "../../models";
import { IMessageDocument } from "../../schemas";

export class MessageResponseDto implements IMessageResponse {

    messageId: string;
    dialogId: string;
    createdBy: string;
    read: boolean;
    content: IMessageContent;
    createdAt: string;
    updatedAt: string;

    constructor(doc: IMessageDocument){
        this.messageId = doc._id;
        this.dialogId = doc.dialogId;
        this.createdBy = doc.createdBy;
        this.read = doc.read;
        this.content = doc.content;
        this.createdAt = doc.createdAt;
        this.updatedAt = doc.updatedAt;
    }

};