import { UniqueId } from "shared";
import { IPaginationOptions } from "..";

export interface IFetchMessagesRequest extends IPaginationOptions {
    dialogId: UniqueId;
};