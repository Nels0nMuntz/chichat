import { IMessageResponse } from "../../../models";

export interface IGetMessagesResponse {
    messages: Array<IMessageResponse>;
    hasMore: boolean;
};