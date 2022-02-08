import { IMessageAttachBase } from "./messageAttach.model";

export interface IMessageContent<T extends IMessageAttachBase> {
    text?: string;
    attach?: Array<T>;
};