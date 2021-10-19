import { WSMessageTypes } from "./wsMessageTypes.model";

export interface IWSMessage<T> {
    type: WSMessageTypes;
    payload: T;
};