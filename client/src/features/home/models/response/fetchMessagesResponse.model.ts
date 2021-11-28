import { IMessageResponse } from "..";

export interface IFetchMessagesResponse  {
    messages: Array<IMessageResponse>;
    hasMore: boolean;
};