import { UniqueId } from "shared";
import { IMessageAttachBase, IMessageResponse } from "../../models";


export interface IMessage extends IMessageResponse, IMessageSelectable { };

export interface IMessageBase <T extends IMessageAttachBase> {
    dialogId: UniqueId;
    createdBy: UniqueId;
    content: IMessageContent<T>;
};

interface IMessageSelectable {
    selected: boolean;
};

export interface IMessageContent<T extends IMessageAttachBase> {
    text?: string;
    attach?: Array<T>;
};

export interface IMessageStore extends IMessageBase<IMessageAttachResponse> {
    messageId: UniqueId;
    read: boolean;
    createdAt: string;
    updatedAt: string;
};