import { IMessage, IMessageContent, IMessageResponse } from "features/home/models";
import { UniqueId } from "shared";

export class MessageResponseDto implements IMessageResponse {

    messageId: UniqueId;
    dialogId: UniqueId;
    createdBy: UniqueId;
    createdAt: string;
    updatedAt: string;
    content: IMessageContent;
    read: boolean;

    constructor(message: IMessage){
        this.dialogId = message.dialogId;
        this.messageId = message.messageId;
        this.createdBy = message.createdBy;
        this.createdAt = message.createdAt;
        this.updatedAt = message.updatedAt;
        this.content = message.content;
        this.read = message.read;
    }

}