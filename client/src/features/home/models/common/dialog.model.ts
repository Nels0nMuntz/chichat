import { IUser, Status, UniqueId } from "shared";
import { IMessage } from "../";
import { IPaginationOptions } from "./paginationOptions.model";


export interface IDialogMessages extends IPaginationOptions {
    status: Status;
    list: Array<IMessage>;
    lastMessage: IMessage | null;
    selectMode: boolean;
    hasMore?: boolean;
};

export interface IDialogForm {
    status: Status;
    text?: string;   
    media?: Array<IDialogAttach>;
    docs?: Array<IDialogAttach>;
};

export interface IDialogAttach {
    file: File;
    previewLink?: string;
};

export interface IDialog {
    dialogId: UniqueId;
    status: Status; 
    member: IUser; 
    messages: IDialogMessages;
    form: IDialogForm;
    isActive: boolean;
};