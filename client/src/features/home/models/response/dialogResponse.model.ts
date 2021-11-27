import { IUser, UniqueId } from "shared";
import { IMessageResponse } from "../";

export interface IDialogResponse {
    dialogId: UniqueId;
    member: IUser;
    messages: Array<IMessageResponse>;
};