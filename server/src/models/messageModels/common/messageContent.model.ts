import { IMessageAttach } from "./messageAttach.model";

export interface IMessageContent {
    text?: string;
    attach?: IMessageAttach;
};