import { UniqueId } from "shared";
import { IMessageBase } from "../common/messageBase.model";

export interface IMessageResponse extends IMessageBase {
    messageId: UniqueId;
    read: boolean;
    createdAt: string;
    updatedAt: string;
};