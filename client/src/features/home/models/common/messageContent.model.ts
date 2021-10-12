import { MessagaType } from "./messageTypes.model";

export interface IMessageContentBase {
    type: MessagaType;
}

export interface IMessageContent extends IMessageContentBase {
    text?: string;
    images?: Array<string>;
};

export interface ITextMessageContent extends IMessageContentBase {
    text: string;
}