import { MessageEvent } from 'ws';
import { IWSMessage } from "./wsMessage.model";

export interface IWSMessageActionData<T> {
    event: MessageEvent;
    parsedData: IWSMessage<T>;
};