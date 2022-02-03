import { IMessageAttachResponse, IMessageContent, IMessageResponse } from "../../models";
import { IMessageDocument } from "../../schemas";

export class MessageResponseDto implements IMessageResponse {

    messageId: string;
    dialogId: string;
    createdBy: string;
    read: boolean;
    content: IMessageContent<IMessageAttachResponse>;
    createdAt: string;
    updatedAt: string;

    constructor(doc: IMessageDocument){
        this.messageId = doc._id;
        this.dialogId = doc.dialogId;
        this.createdBy = doc.createdBy;
        this.read = doc.read;
        this.content = {
            text: doc.content.text,
            attach: doc.content.attach && doc.content.attach.map(attach => ({
                attachId: attach['_id'],
                attachType: attach.attachType,
                fileType: attach.fileType,
                name: attach.name,
                url: attach.url,
                createdAt: attach.createdAt,
                updatedAt: attach.updatedAt,
            })),
        };
        this.createdAt = doc.createdAt;
        this.updatedAt = doc.updatedAt;
    }

};