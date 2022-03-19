import { UniqueId } from "shared";

export interface IDeleteMessagesRequest {
    dialogId: UniqueId;
    messageIds: UniqueId[];
};