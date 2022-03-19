import { call, put, take } from "@redux-saga/core/effects";
import { END, eventChannel, EventChannel } from "redux-saga";

import { 
    MessageDto, 
    pushDialogMessageAction, 
    deleteDialogMessagesFromLocalStateAction,
} from "features/home/store";
import { IDeleteMessagesRequest } from "features/home/models";
import { WebSocketEventHandler } from "../../helpers";
import { WebSocketEvent, WebSocketEventTypes } from '../../models';
import { setWebSocketAction, sendWebSocketEventAction } from "../actions";
import { IUser, UniqueId } from "shared";


export function* recieveWebSocketEventSaga(user: IUser) {
    const { userId } = user;
    const socket = new WebSocket('ws://localhost:3000');
    yield put(setWebSocketAction({ payload: socket }));
    const eventChanel: EventChannel<any> = yield call(createWebSocketEventChannel, userId, socket);
    while(true) {
        try {
            const { type, payload }: WebSocketEvent = yield take(eventChanel);
            switch (type) {
                case WebSocketEventTypes.SET_CLIENT_CONNECTION:
                    const event = WebSocketEventHandler.clientConnectionEvent({ userId });
                    yield put(sendWebSocketEventAction({ payload: event }));
                    break;
                case WebSocketEventTypes.CREATE_MESSAGE:
                    const message = new MessageDto(payload);
                    yield put(pushDialogMessageAction({
                        payload: { message }
                    }));
                    break;
                case WebSocketEventTypes.DELETE_MESSAGE:
                    yield put(deleteDialogMessagesFromLocalStateAction({ payload }));
                    break;
                default:
                    break;
            }
        } catch (error: any) {
            console.log(error);            
        };
    };
};

function createWebSocketEventChannel(userId: UniqueId, socket: WebSocket) {
    return eventChannel((emitter: (input: any | END) => void) => {
        socket.onopen = function(){
            console.log('Client socket is opened');
            const message = WebSocketEventHandler.clientConnectionEvent({ userId });
            emitter(message);
        };
        socket.onerror = function(err: any) {
            console.log('WebSocket error' + err);            
        };
        socket.onmessage = function(event) {
            const message = WebSocketEventHandler.parseWebSocketEvent(event);
            emitter(message);
        };
        return () => {
            socket.close();
        };
    });
};