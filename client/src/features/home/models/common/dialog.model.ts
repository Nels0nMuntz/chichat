import { IUser, Status } from "shared";
import { IMessage } from "../";
import { IPaginationOptions } from "./paginationOptions.model";
import { UniqueId } from "./uniqueId.model";

export interface IDialog extends IPaginationOptions {
    status: Status;
    dialogId: UniqueId;
    member: IUser;
    messages: Array<IMessage>;
    lastMessage: IMessage;
};