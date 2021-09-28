import { IMessageContent } from "./messageContent.model";

export interface IMessage {
    messageId: string;
    dialogId: string;
    createdBy: string;
    content: IMessageContent;
    read: boolean;
    createdAt: string;
    updatedAt: string;
};