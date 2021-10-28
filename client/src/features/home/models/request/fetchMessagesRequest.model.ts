import { IPaginationOptions, UniqueId } from "..";

export interface IFetchMessagesRequest extends IPaginationOptions {
    dialogId: UniqueId;
};