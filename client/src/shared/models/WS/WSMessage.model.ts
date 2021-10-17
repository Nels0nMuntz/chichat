import { WSMessageTypes } from "./WSMessageTypes.model";

export interface IWSMessage<T = any> {
    type: WSMessageTypes;
    payload: T;
};