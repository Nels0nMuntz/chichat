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
    url?: string;
    playing?: boolean;
    audioBuffer?: AudioBuffer;
    audioContext?: AudioContext;
    // duration?: number;
    // analyser?: AnalyserNode;
};

export interface IMessageAttach extends IMessageAttachResponse {
    file: IMessageAttachFile;
};