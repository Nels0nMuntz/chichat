import { IMessageAttachResponse } from './../response/messageAttachResponse.model';
import { Status, DateISOString } from 'shared';


export type MessageAttachType = 'image' | 'video' | 'file' | 'voice';

export interface IMessageAttachBase {    
    url: string;
    name: string;
    fileType: {
        ext: string;
        mime: string;
    };
    attachType: MessageAttachType;
    createdAt: DateISOString;
    updatedAt: DateISOString;
};

export interface IMessageAttachFile {
    status: Status;
    playing?: boolean;
    duration?: number;
    buffer?: ArrayBuffer;
    audioContext?: AudioContext;
    analyser?: AnalyserNode;
    localUrl?: string;
};

export interface IMessageAttach extends IMessageAttachResponse {
    file: IMessageAttachFile;
};