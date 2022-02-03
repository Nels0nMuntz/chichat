import { UniqueId } from 'shared';

export interface IFetchMessageAttachResponse {
    messageId: UniqueId;
    attachId: UniqueId;
    file: ArrayBuffer;
};