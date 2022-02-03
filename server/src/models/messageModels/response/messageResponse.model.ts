import { IMessageContent } from "../common/messageContent.model";
import { IMessageAttachResponse } from "./messageAttachResponse.model";

export interface IMessageResponse {
    messageId: string;
    dialogId: string;
    createdBy: string;
    read: boolean;
    content: IMessageContent<IMessageAttachResponse>;
    createdAt: string;
    updatedAt: string;
};