import { Action } from "redux";

import { setWebSocketAction } from "./actions";


interface IWebSocketState {
    websocket: WebSocket | null;
};

const initState: IWebSocketState = {
    websocket: null,
};

export const webSocketReducer = (state: IWebSocketState = initState, action: Action): IWebSocketState => {

    if(setWebSocketAction.is(action)) {
        return {
            ...state,
            websocket: action.payload,
        };
    };

    return state;
};