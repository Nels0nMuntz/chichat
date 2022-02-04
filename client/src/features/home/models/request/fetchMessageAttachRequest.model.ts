import { UniqueId } from 'shared';
import { IMessageAttach } from './../common/messageAttach.model';

export interface IFetchMessageAttachRequest {
    messageId: UniqueId;
    attach: IMessageAttach;
};