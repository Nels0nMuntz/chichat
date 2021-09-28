import { Action } from 'redux';
import { Status } from 'shared';
import { IDialog } from '../models/common/dialog.model';

import {
    changeMessageAction,
    setDialogsStatus,
    setDialogsList,
} from './actions';


interface IHomeState {
    dialogs: {
        status: Status;
        list: Array<IDialog>;
    };
    selectedDialogId: string | null;
    messageInput: {
        value: string,
    };
};

const initState: IHomeState = {
    dialogs: {
        status: Status.Initial,
        list: [],
    },
    selectedDialogId: null,
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

    if(setDialogsStatus.is(action)){
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                status: action.payload,
            }
        }
    }

    if(setDialogsList.is(action)){
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                list: action.payload.dialogs,
            }
        }
    }

    return state;

};