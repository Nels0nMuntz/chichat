import { ICreateMessageRequest, IMessageContent } from "../../models";
import { IMessageAttachResponse } from './../../models/messageModels/response/messageAttachResponse.model';

export class CreateMessageRequestDto {
    
    dialogId: string;
    createdBy: string;
    content: IMessageContent<IMessageAttachResponse>;

    constructor(message: ICreateMessageRequest){
        this.dialogId = message.dialogId;
        this.createdBy = message.createdBy;
        this.content = message.content;
    }
};