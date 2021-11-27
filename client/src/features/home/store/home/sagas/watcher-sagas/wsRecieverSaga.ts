import { END, eventChannel, EventChannel } from "redux-saga";
import { call, take, put, select } from "@redux-saga/core/effects";

import { 
    setWebSocketAction,
    addNewMessageAction,
    sendWSMessageAction,
    selectUserData,
} from '../../..';
import { IUser, IWSMessage, WSMessageTypes } from "shared";
import { IInitWSClientRequest, IMessageResponse } from "../../../../models";
import { MessageDto } from "features/home/store";


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
                const _message = message as IWSMessage<IMessageResponse>;
                yield put(addNewMessageAction({ payload: {
                    dialogId: _message.payload.dialogId,
                    message: new MessageDto(_message.payload),
                } }));                    
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