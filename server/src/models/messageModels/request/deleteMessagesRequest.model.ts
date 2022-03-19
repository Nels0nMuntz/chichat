import { UniqueId } from "src/models";

export interface IDeleteMessagesRequest {
    dialogId: UniqueId;
    messageIds: UniqueId[];
};