import { IMessageContent } from "../common/messageContent.model";
import { IMessageAttachResponse } from './../response/messageAttachResponse.model';

export interface IUpdateMessageRequest {
    messageId: string;
    content: IMessageContent<IMessageAttachResponse>;
};