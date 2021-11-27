import { UniqueId } from "shared";
import { IMessageContent } from "./messageContent.model";

export interface IMessageBase {
    dialogId: UniqueId;
    createdBy: UniqueId;
    content: IMessageContent;
};