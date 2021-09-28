import { IUser } from "shared";
import { IMessage } from "./message.model";

export interface IDialog {
    dialogId: string;
    member: IUser;
    messages: Array<IMessage>;
};