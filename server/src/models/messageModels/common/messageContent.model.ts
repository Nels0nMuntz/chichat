import { IMessageAttach } from "./messageAttach.model";

export interface IMessageContent<T extends IMessageAttach> {
    text?: string;
    attach?: Array<T>;
};