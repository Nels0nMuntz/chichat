import { IMessageBase } from "../common/messageBase.model";

export interface IMessageResponse extends IMessageBase {
    messageId: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
    // selected: boolean;
};