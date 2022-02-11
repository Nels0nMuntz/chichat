import { IMessageBase } from "../common/message.model";
import { IMessageAttachResponse } from './messageAttachResponse.model';
import { UniqueId } from 'shared';

export interface IMessageResponse extends IMessageBase<IMessageAttachResponse> {
    messageId: UniqueId;
    read: boolean;
    createdAt: string;
    updatedAt: string;
};