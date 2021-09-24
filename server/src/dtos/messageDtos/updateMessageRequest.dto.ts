import { IMessageContent, IUpdateMessageRequest } from "../../models";

export class UpdateMessageRequestDto {

    messageId: string
    content: IMessageContent

    constructor(message: IUpdateMessageRequest){
        this.messageId = message.messageId
        this.content = message.content
    }

};