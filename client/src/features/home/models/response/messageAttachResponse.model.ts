import { IMessageAttachBase } from './../common/messageAttachBase.model';
import { UniqueId } from 'shared';

export interface IMessageAttachResponse extends IMessageAttachBase {
    attachId: UniqueId;
};