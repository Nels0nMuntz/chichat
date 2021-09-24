import { ICreateMessageRequest, IMessageContent } from "../../models";

export class CreateMessageRequestDto {
    
    dialogId: string
    createdBy: string
    content: IMessageContent

    constructor(message: ICreateMessageRequest){
        this.dialogId = message.dialogId
        this.createdBy = message.createdBy
        this.content = message.content
    }
};