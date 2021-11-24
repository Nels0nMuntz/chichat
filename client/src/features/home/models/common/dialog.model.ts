import { IUser, Status } from "shared";
import { IMessage } from "../";
import { IPaginationOptions } from "./paginationOptions.model";
import { UniqueId } from "./uniqueId.model";


export interface IDialogMessages {
    list: Array<IMessage>;
    lastMessage: IMessage | null;
    selectMode: boolean;
    selectedMessages: Array<IMessage>;
};

export interface IDialogForm {
    status: Status;
    text: string;   
}

export interface IDialog extends IPaginationOptions {
    status: Status; 
    dialogId: UniqueId;
    member: IUser; 
    messages: IDialogMessages;
    form: IDialogForm;
};