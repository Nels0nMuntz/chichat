import { AudioPlayer, Status } from 'shared';
import { IMessageAttachResponse } from './../response/messageAttachResponse.model';

export interface IMessageAttach extends IMessageAttachResponse {
    file: {
        status: Status;
        buffer?: ArrayBuffer;
        player?: AudioPlayer;
        playing?: boolean;
    };
};