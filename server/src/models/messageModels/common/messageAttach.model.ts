import { MessageAttachType } from "./messageAttachType.model";

export interface IMessageAttach {
    url: string;
    name: string;
    fileType: {
        ext: string;
        mime: string;
    };
    attachType: MessageAttachType;
    createdAt: string;
    updatedAt: string;
};