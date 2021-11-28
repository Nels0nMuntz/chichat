import { IUser, Status, UniqueId } from "shared";
import { IMessage } from "../";
import { IPaginationOptions } from "./paginationOptions.model";


export interface IDialogMessages {
    list: Array<IMessage>;
    lastMessage: IMessage | null;
    selectMode: boolean;
    hasMore?: boolean;
};

export interface IDialogForm {
    status: Status;
    text: string;   
}

export interface IDialog extends IPaginationOptions {
    dialogId: UniqueId;
    status: Status; 
    member: IUser; 
    messages: IDialogMessages;
    form: IDialogForm;
    isActive: boolean;
};