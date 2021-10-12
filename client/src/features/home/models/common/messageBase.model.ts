import { IMessageContent } from "./messageContent.model";

export interface IMessageBase {
    dialogId: string;
    content: IMessageContent;
};