import { IMessage, IMessageContent, IMessageResponse } from "features/home/models";
import { UniqueId } from "shared";

export class MessageDto implements IMessage {

    messageId: UniqueId;
    dialogId: UniqueId;
    createdBy: UniqueId;
    createdAt: string;
    updatedAt: string;
    content: IMessageContent;
    read: boolean;
    selected: boolean;

    constructor(message: IMessageResponse) {
        this.dialogId = message.dialogId;
        this.messageId = message.messageId;
        this.createdBy = message.createdBy;
        this.createdAt = message.createdAt;
        this.content = message.content;
        this.read = message.read;
        this.updatedAt = message.updatedAt;
        this.selected = false;
    }
}