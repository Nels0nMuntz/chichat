import { UniqueId } from "shared";
import { IMessageBase } from "./messageBase.model";
import { IMessageAttach } from './messageAttach.model';

export interface IMessage extends IMessageBase<IMessageAttach> {
    messageId: UniqueId;
    read: boolean;
    createdAt: string;
    updatedAt: string;
    selected: boolean;
};