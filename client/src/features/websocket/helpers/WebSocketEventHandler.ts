import { WebSocketEvent, WebSocketEventTypes } from "../models";
import { 
    IMessageAttachBase, 
    IMessageBase, 
    IMessageContent,
    IDeleteMessagesRequest,
} from "features/home/models";
import { UniqueId } from "shared";


interface CreateDialogMessagePayload {
    dialogId: UniqueId;
    createdBy: UniqueId;
    content: IMessageContent<IMessageAttachBase>
};

export class WebSocketEventHandler {

    static parseWebSocketEvent = (event: MessageEvent) => {
        return JSON.parse(event.data);
    }

    static clientConnectionEvent = (payload: { userId: UniqueId }): WebSocketEvent<{ userId: UniqueId }> => {
        return {
            type: WebSocketEventTypes.SET_CLIENT_CONNECTION,
            payload,
        }
    }

    static createDialogMessageEvent = (payload: CreateDialogMessagePayload): WebSocketEvent<IMessageBase<IMessageAttachBase>> => {
        return {
            type: WebSocketEventTypes.CREATE_MESSAGE,
            payload,
        }
    }

    static deleteDialogMessageEvent = (payload: IDeleteMessagesRequest): WebSocketEvent<IDeleteMessagesRequest> => {
        return {
            type: WebSocketEventTypes.DELETE_MESSAGE,
            payload,
        }
    }
};