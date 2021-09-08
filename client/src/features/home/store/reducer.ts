import { Action } from 'redux';

import {
    changeMessageAction
} from './actions';


interface IHomeState {
    messageInput: {
        value: string
    },
};

const initState: IHomeState = {
    messageInput: {
        value: '',
    },
};

export const homeReducer = (state: IHomeState = initState, action: Action): IHomeState => {

    if(changeMessageAction.is(action)){
        return {
            ...state,
            messageInput: {
                ...state.messageInput,
                value: action.payload.value,
            }
        }
    };

    return state;

};