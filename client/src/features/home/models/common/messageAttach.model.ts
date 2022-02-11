import { Status, UniqueId, DateISOString } from 'shared';


export type MessageAttachType = 'image' | 'video' | 'file' | 'voice';

export interface IMessageAttachBase {
    url: string;
    name: string;
    fileType: {
        ext: string;
        mime: string;
    };
    attachType: MessageAttachType;
    playable: boolean;
    createdAt: DateISOString;
    updatedAt: DateISOString;
};

export interface IMessageAttach<T = {}> extends IMessageAttachBase {
    attachId: UniqueId;
    status: Status;
    file: T;
};

export interface IMessageAttachVoiceFile {
    urlFromBlob?: string;
    playing?: boolean;
    duration?: number;
    analyser?: AnalyserNode;
    audioBuffer?: AudioBuffer;
    audioContext?: AudioContext;
};