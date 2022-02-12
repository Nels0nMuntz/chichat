import { UniqueId } from "shared";
import { IMessageAttachBase } from "../../models";
import { IMessageAttachStore } from "./messageAttach.model";


// export interface IMessage extends IMessageResponse, IMessageSelectable { };

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

export interface IMessageStore extends IMessageBase<IMessageAttachStore>, IMessageSelectable {
    messageId: UniqueId;
    read: boolean;
    createdAt: string;
    updatedAt: string;
};