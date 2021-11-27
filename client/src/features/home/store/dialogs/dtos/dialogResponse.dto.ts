import { IDialog, IDialogResponse, IMessageResponse } from "features/home/models";
import { IUser, UniqueId } from "shared";
import { MessageResponseDto } from "./messageResponse.dto";


export class DialogResponseDto implements IDialogResponse {

    dialogId: UniqueId;
    member: IUser;
    messages: Array<IMessageResponse>;

    constructor(dialog: IDialog){
        this.dialogId = dialog.dialogId;
        this.member = dialog.member;
        this.messages = dialog.messages.list.map(message => new MessageResponseDto(message));
    }

}