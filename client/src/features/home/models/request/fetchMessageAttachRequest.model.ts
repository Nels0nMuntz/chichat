import { UniqueId } from 'shared';
import { IMessageAttachBase } from './../common/messageAttach.model';

export interface IFetchMessageAttachRequest {
    messageId: UniqueId;
    attach: IMessageAttachBase;
};