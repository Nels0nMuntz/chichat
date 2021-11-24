import { UniqueId } from "..";
import { IMessageContent } from "./messageContent.model";

export interface IMessageBase {
    dialogId: UniqueId;
    createdBy: UniqueId;
    content: IMessageContent;
};