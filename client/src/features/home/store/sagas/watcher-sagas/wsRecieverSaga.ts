import { END, eventChannel, EventChannel } from "redux-saga";
import { call, take, put } from "@redux-saga/core/effects";

import { 
    setWebSocketAction,
    addMessageToListAction,
} from '../../actions';
import { IWSMessage, WSMessageTypes } from "shared";
import { IMessage } from "features/home/models";


export function* wsRecieverSaga() {
    const socket: WebSocket = yield call(createWebSocket);   
    yield put(setWebSocketAction({ payload: socket }));
    const channel: EventChannel<any> = yield call(createWebSocketEventChanel, socket);    
    
    while (true) {
        const message: IWSMessage = yield take(channel);
        
        switch (message.type) {
            case WSMessageTypes.CREATE_MESSAGE:
                const _message = message as IWSMessage<IMessage>;
                yield put(addMessageToListAction({ payload: _message.payload }));                    
                break;                
            default:
                break;
        };
    }
};

function createWebSocketEventChanel(socket: WebSocket) {
    return eventChannel((emitter: (input: any | END) => void) => {
        socket.onopen = () => {
            console.log('Client socket is opened');
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