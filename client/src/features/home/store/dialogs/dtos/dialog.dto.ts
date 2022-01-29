import { IDialog, IDialogForm, IDialogMessages, IDialogResponse } from "features/home/models";
import { IUser, PAGINATION_LIMIT, Status, UniqueId } from "shared";
import { MessageDto } from "./message.dto";


export class DialogDto implements IDialog {

    status: Status;
    dialogId: UniqueId;
    member: IUser;
    isActive: boolean;
    messages: IDialogMessages;
    form: IDialogForm;

    constructor(dialog: IDialogResponse){
        this.status = Status.Initial;
        this.dialogId = dialog.dialogId;
        this.member = dialog.member;
        this.isActive = false;
        this.messages = {
            status: Status.Initial,
            list: dialog.messages.length ? dialog.messages.map(message => new MessageDto(message)) : [],
            lastMessage: dialog.messages.length ? new MessageDto(dialog.messages[dialog.messages.length - 1]) : null,
            selectMode: false,
            page: 1,
            limit: PAGINATION_LIMIT,
        };
        this.form = {
            status: Status.Initial,
            text: '',
            editMode: false,
        };
    }
}