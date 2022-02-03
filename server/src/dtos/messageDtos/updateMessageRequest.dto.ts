import { IMessageContent, IUpdateMessageRequest, IMessageAttachResponse } from "../../models";

export class UpdateMessageRequestDto {

    messageId: string
    content: IMessageContent<IMessageAttachResponse>

    constructor(message: IUpdateMessageRequest){
        this.messageId = message.messageId
        this.content = message.content
    }

};