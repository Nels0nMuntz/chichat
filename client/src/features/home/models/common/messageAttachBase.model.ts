import { DateISOString } from "shared";
import { MessageAttachType } from "./messageAttachType.model";

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