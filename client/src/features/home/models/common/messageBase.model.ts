import { IMessageContent } from "./messageContent.model";

export interface IMessageBase {
    dialogId: string;
    createdBy: string;
    content: IMessageContent;
};