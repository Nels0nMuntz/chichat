import { IUser } from "shared";
import { IMessageResponse, UniqueId } from "../";

export interface IDialogResponse {
    dialogId: UniqueId;
    member: IUser;
    messages: Array<IMessageResponse>;
};