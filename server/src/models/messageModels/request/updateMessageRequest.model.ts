import { IMessageContent } from "../common/messageContent.model";

export interface IUpdateMessageRequest {
    messageId: string
    content: IMessageContent
};