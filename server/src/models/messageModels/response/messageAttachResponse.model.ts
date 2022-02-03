
import { IMessageAttach } from '../common/messageAttach.model';

export interface IMessageAttachResponse extends IMessageAttach {
    attachId: string;
};