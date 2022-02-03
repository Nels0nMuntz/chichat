import { UniqueId } from "shared";
import { IMessageContent } from "./messageContent.model";
import { IMessageAttachBase } from "./messageAttachBase.model";

export interface IMessageBase<T extends IMessageAttachBase> {
    dialogId: UniqueId;
    createdBy: UniqueId;
    content: IMessageContent<T>;
};