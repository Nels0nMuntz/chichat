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
    limit: typeof PAGINATION_LIMIT;
    page: 1;

    constructor(dialog: IDialogResponse){
        this.status = Status.Initial;
        this.dialogId = dialog.dialogId;
        this.member = dialog.member;
        this.isActive = false;
        this.messages = {
            list: dialog.messages.length ? dialog.messages.map(message => new MessageDto(message)) : [],
            lastMessage: dialog.messages.length ? new MessageDto(dialog.messages[dialog.messages.length - 1]) : null,
            selectMode: false,
        };
        this.form = {
            status: Status.Initial,
            text: '',
        };
        this.limit = PAGINATION_LIMIT;
        this.page = 1;
    }
}