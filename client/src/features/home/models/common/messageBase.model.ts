import { UniqueId } from "shared";
import { IMessageContent } from "./messageContent.model";
import { IMessageAttachBase } from "./messageAttach.model";

export interface IMessageBase<T extends IMessageAttachBase> {
    dialogId: UniqueId;
    createdBy: UniqueId;
    content: IMessageContent<T>;
};