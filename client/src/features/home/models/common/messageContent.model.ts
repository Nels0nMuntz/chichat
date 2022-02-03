import { IMessageAttachBase } from "./messageAttachBase.model";

export interface IMessageContent<T extends IMessageAttachBase> {
    text?: string;
    attach?: Array<T>;
};