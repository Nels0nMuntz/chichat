import { IUser } from "shared";
import { IMessageResponse } from "../";

export interface IDialogResponse {
    dialogId: string;
    member: IUser;
    messages: Array<IMessageResponse>;
};