import { IUser } from "shared";
import { IMessageResponse } from "../";

export interface IDialog {
    dialogId: string;
    member: IUser;
    lastMessage: IMessageResponse;
};