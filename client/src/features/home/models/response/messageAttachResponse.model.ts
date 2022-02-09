import { IMessageAttachBase } from './../common/messageAttach.model';
import { UniqueId } from 'shared';

export interface IMessageAttachResponse extends IMessageAttachBase {
    attachId: UniqueId;
};