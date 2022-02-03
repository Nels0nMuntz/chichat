import { UniqueId } from "shared";
import { IMessageBase } from "../common/messageBase.model";
import { IMessageAttachResponse } from './messageAttachResponse.model';

export interface IMessageResponse extends IMessageBase<IMessageAttachResponse> {
    messageId: UniqueId;
    read: boolean;
    createdAt: string;
    updatedAt: string;
};