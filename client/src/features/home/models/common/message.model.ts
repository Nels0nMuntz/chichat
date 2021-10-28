import { UniqueId } from "..";
import { IMessageBase } from "./messageBase.model";

export interface IMessage extends IMessageBase {
    messageId: UniqueId;
    read: boolean;
    createdAt: string;
    updatedAt: string;
    selected: boolean;
};