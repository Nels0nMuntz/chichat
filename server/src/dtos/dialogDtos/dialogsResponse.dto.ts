import { IDialogPopulated } from "../../schemas";
import { IDialogResponse, IMessageResponse, IUserResponse } from "../../models";
import { MessageResponseDto } from "../messageDtos";
import { UserResponseDto } from "../userDtos";


export class DialogsReasponseDto implements IDialogResponse {

    readonly dialogId: string;
    readonly member: IUserResponse;
    readonly messages: Array<IMessageResponse>;

    constructor(doc: IDialogPopulated, userId: string){
        const memberDoc = doc.member_1.id === userId ? doc.member_2 : doc.member_1;
        this.dialogId = doc.id;
        this.member = new UserResponseDto(memberDoc);
        this.messages = doc.messages.map(msg => new MessageResponseDto(msg));
    }

}