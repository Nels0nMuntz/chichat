import { Action } from 'redux';
import { Status } from 'shared';
import { IMessage, ITextMessageContent } from '../models';
import { IDialog } from '../models/common/dialog.model';

import {
    setHomeStateAction,
    setDialogsStatusAction,
    setDialogsListAction,
    setSelectedDialogAction,
    setMessagesStatusAction,
    setMessagesListAction,
    setTextMessageAction,
} from './actions';


interface IHomeState {
    status: Status,
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
        textMessage: ITextMessageContent;
    }
};

const initState: IHomeState = {
    status: Status.Initial,
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
        textMessage: {
            text: "",
            type: "text",
        },
    },
};

export const homeReducer = (state: IHomeState = initState, action: Action): IHomeState => {

    if(setHomeStateAction.is(action)){
        return {
            ...state,
            status: action.payload,
        };
    };

    // dialogs

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


    // messages

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

    if(setTextMessageAction.is(action)){
        return {
            ...state,
            messages: {
                ...state.messages,
                textMessage: {
                    ...state.messages.textMessage,
                    text: action.payload,
                }
            }
        };
    };

    return state;

};