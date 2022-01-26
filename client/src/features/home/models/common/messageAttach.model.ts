import { DateISOString } from "shared";
import { MessageAttachType } from "./messageAttachType.model";

export interface IMessageAttach {
    url: string;
    name: string;
    type: MessageAttachType;
    createdAt: DateISOString;
    updatedAt: DateISOString;
};