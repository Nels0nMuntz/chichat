import { END, eventChannel, EventChannel } from "redux-saga";
import { call, take, put, select } from "@redux-saga/core/effects";

import { 
    setWebSocketAction,
    addLastMessageAction,
    sendWSMessageAction,
} from '../../actions';
import {
    selectUserData,
} from '../../selectors';
import { IUser, IWSMessage, WSMessageTypes } from "shared";
import { IInitWSClientRequest, IMessage } from "../../../models";


export function* wsRecieverSaga() {
    const socket: WebSocket = yield call(createWebSocket);   
    yield put(setWebSocketAction({ payload: socket }));
    const user: IUser = yield select(selectUserData)
    const channel: EventChannel<any> = yield call(createWebSocketEventChanel, user.userId, socket);    
    
    while (true) {
        const message: IWSMessage = yield take(channel);
        
        switch (message.type) {
            case WSMessageTypes.INIT_CONNECTED_CLIENT: {
                const _message = message as IInitWSClientRequest;
                yield put(sendWSMessageAction({ payload: _message }));
                break;
            };                
            case WSMessageTypes.CREATE_MESSAGE: {
                const _message = message as IWSMessage<IMessage>;
                yield put(addLastMessageAction({ payload: _message.payload }));                    
                break; 
            };
            default:
                break;
        };
    }
};

function createWebSocketEventChanel(userId: string, socket: WebSocket) {
    return eventChannel((emitter: (input: any | END) => void) => {
        socket.onopen = () => {
            console.log('Client socket is opened');
            const message: IInitWSClientRequest = {
                type: WSMessageTypes.INIT_CONNECTED_CLIENT,
                payload: { userId },
            };
            emitter(message);
        };
        socket.onerror = (err: any) => {
            console.log('Websocket error ' + err);
            console.dir(err);
        };
        socket.onmessage = (event) => {
            const message: IWSMessage = JSON.parse(event.data);
            emitter(message);
        };

        return () => {
            console.log("WebSocket off");
        };
    });
};

function createWebSocket(){
    return new WebSocket('ws://localhost:3000');
};