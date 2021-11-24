import { IMessage, IMessageContent, IMessageResponse, UniqueId } from "features/home/models";

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

    // static fromResponse = (message: IMessageResponse): IMessage => {
    //     return {
    //         dialogId: message.dialogId,
    //         messageId: message.messageId,
    //         createdBy: message.createdBy,
    //         createdAt: message.createdAt,
    //         content: message.content,
    //         read: message.read,
    //         updatedAt: message.updatedAt,
    //         selected: false,
    //     }
    // }

    // static toResponse = (message: IMessage): IMessageResponse => {
    //     return {
    //         dialogId: message.dialogId,
    //         messageId: message.messageId,
    //         createdBy: message.createdBy,
    //         createdAt: message.createdAt,
    //         content: message.content,
    //         read: message.read,
    //         updatedAt: message.updatedAt,
    //     }
    // }
}