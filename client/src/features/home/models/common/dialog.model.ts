import { IUser, Status, UniqueId } from "shared";
import { IMessageStore } from "../";
import { IPaginationOptions } from "./paginationOptions.model";


export interface IDialogMessages extends IPaginationOptions {
    status: Status;
    list: Array<IMessageStore>;
    lastMessage: IMessageStore | null;
    selectMode: boolean;
    hasMore?: boolean;
};

export interface IDialogForm {
    status: Status;
    editMode: boolean;
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