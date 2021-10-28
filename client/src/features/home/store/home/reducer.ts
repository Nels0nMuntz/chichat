import { Action } from 'redux';
import { IUser, Status } from 'shared';

import {
    setHomeStateAction,
    setHomeUserDataAction,
    setWebSocketAction,
} from './actions';


interface IHomeState {
    status: Status,
    user: IUser;
    webSocket: {
        socket: WebSocket | null;
    };
};

const initState: IHomeState = {
    status: Status.Initial,
    user: {
        userId: "613f475871e72072d08b5998",
        email: "",
        firstName: "",
        phoneNumber: "",
    },
    webSocket: {
        socket: null,
    },
};

export const homeReducer = (state: IHomeState = initState, action: Action): IHomeState => {

    if (setHomeStateAction.is(action)) {
        return {
            ...state,
            status: action.payload,
        };
    };

    // user

    if (setHomeUserDataAction.is(action)) {
        return {
            ...state,
            user: action.payload,
        };
    };

    // WebSocket

    if (setWebSocketAction.is(action)) {
        return {
            ...state,
            webSocket: {
                ...state.webSocket,
                socket: action.payload,
            }
        };
    };

    return state;

};