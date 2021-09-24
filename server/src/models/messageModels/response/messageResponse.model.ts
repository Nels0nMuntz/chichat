import { IMessageContent } from "../common/messageContent.model";

export interface IMessageResponse {
    messageId: string
    dialogId: string
    createdBy: string
    read: boolean
    content: IMessageContent
};