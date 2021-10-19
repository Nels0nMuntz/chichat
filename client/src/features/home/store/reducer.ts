import { Action } from 'redux';
import { IUser, Status } from 'shared';
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
    resetTextMessageAction,
    setHomeUserDataAction,
    addLastMessageAction,
    setWebSocketAction,
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
    };
    user: IUser;
    webSocket: {
        socket: WebSocket | null;
    };
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

    // dialogs

    if (setDialogsStatusAction.is(action)) {
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                status: action.payload,
            },
        };
    };

    if (setDialogsListAction.is(action)) {
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                list: action.payload.dialogs,
            },
        };
    };

    if (setSelectedDialogAction.is(action)) {
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                selectedDialog: action.payload,
            },
        };
    };


    // messages

    if (setMessagesStatusAction.is(action)) {
        return {
            ...state,
            messages: {
                ...state.messages,
                status: action.payload,
            }
        };
    };

    if (setMessagesListAction.is(action)) {
        return {
            ...state,
            messages: {
                ...state.messages,
                list: action.payload,
            }
        };
    };

    if (setTextMessageAction.is(action)) {
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

    if (resetTextMessageAction.is(action)) {
        return {
            ...state,
            messages: {
                ...state.messages,
                textMessage: {
                    ...state.messages.textMessage,
                    text: "",
                }
            }
        };
    };

    if (addLastMessageAction.is(action)) {
        const dialog = state.dialogs.list.filter(dialog => dialog.dialogId === action.payload.dialogId)[0];
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                list: [
                    ...state.dialogs.list.filter(dialog => dialog.dialogId !== action.payload.dialogId),
                    {                        
                        ...dialog,
                        messages: [action.payload],
                    },
                ],
            },
            messages: {
                ...state.messages,
                list: [
                    action.payload,
                    ...state.messages.list,
                ]
            }
        }
    }

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