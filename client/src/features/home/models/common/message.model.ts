import { IMessageBase } from "./messageBase.model";

export interface IMessage extends IMessageBase {
    messageId: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
    selected: boolean;
};