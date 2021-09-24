import { IMessageContent } from "../common/messageContent.model";

export interface ICreateMessageRequest {
    dialogId: string
    createdBy: string
    content: IMessageContent
}