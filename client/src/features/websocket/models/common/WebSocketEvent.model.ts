import { WebSocketEventTypes } from "./WebSocketEventTypes.model";

export interface WebSocketEvent<T = any> {
    type: WebSocketEventTypes;
    payload: T;
};