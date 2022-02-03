import { IMessageContent } from "../common/messageContent.model";
import { IMessageAttachResponse } from './../response/messageAttachResponse.model';

export interface ICreateMessageRequest {
    dialogId: string;
    createdBy: string;
    content: IMessageContent<IMessageAttachResponse>;
};