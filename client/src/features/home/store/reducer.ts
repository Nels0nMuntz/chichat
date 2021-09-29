import { Action } from 'redux';
import { Status } from 'shared';
import { IMessage } from '../models';
import { IDialog } from '../models/common/dialog.model';

import {
    changeMessageAction,
    setDialogsStatusAction,
    setDialogsListAction,
    setSelectedDialogAction,
    setMessagesStatusAction,
    setMessagesListAction,
} from './actions';


interface IHomeState {
    dialogs: {
        status: Status;
        list: Array<IDialog>;
        selectedDialog: IDialog | null;
    };
    messages: {
        status: Status;
        offset: number;
        limit: number;
        list: Array<IMessage>
        messageInput: {
            value: string,
        };
    }
};

const initState: IHomeState = {
    dialogs: {
        status: Status.Initial,
        list: [],
        selectedDialog: null,
    },
    messages: {
        status: Status.Initial,
        offset: 0,
        limit: 10,
        list: [],
        messageInput: {
            value: '',
        },
    }
};

export const homeReducer = (state: IHomeState = initState, action: Action): IHomeState => {

    if(changeMessageAction.is(action)){
        return {
            ...state,
            messages: {
                ...state.messages,
                messageInput: {
                    ...state.messages.messageInput,
                    value: action.payload.value,
                },
            }
        };
    };

    if(setDialogsStatusAction.is(action)){
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                status: action.payload,
            },
        };
    };

    if(setDialogsListAction.is(action)){
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                list: action.payload.dialogs,
            },
        };
    };

    if(setSelectedDialogAction.is(action)){
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                selectedDialog: action.payload,
            },
        };
    };

    if(setMessagesStatusAction.is(action)){
        return {
            ...state,
            messages: {
                ...state.messages,
                status: action.payload,
            }
        };
    };

    if(setMessagesListAction.is(action)){
        return {
            ...state,
            messages: {
                ...state.messages,
                list: action.payload,
            }
        };
    };

    return state;

};