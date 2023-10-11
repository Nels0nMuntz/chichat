import { Status } from 'shared';

export interface IStoreFileResult {
    status: Status;
    file: File;
    fileUrl: string;
    error?: Error;
}
