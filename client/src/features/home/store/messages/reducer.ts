import { Action } from "redux";
import { Status } from "shared";
import { ITextMessageContent } from "../../models";
import {
    setMessagesStatusAction,
    setTextMessageAction,
    resetTextMessageAction,
    enableMessagesSelectModeAction,
    disableMessagesSelectModeAction,
} from '../';


interface IMessagesState {
    status: Status;
    textMessage: ITextMessageContent;
    selectMode: boolean;
};

const initState: IMessagesState = {
    status: Status.Initial,
    textMessage: {
        text: "",
        type: "text",
    },
    selectMode: false,
};

export const messagesReducer = (state: IMessagesState = initState, action: Action): IMessagesState => {

    if (setMessagesStatusAction.is(action)) {
        return {
            ...state,
            status: action.payload,
        };
    };

    if (setTextMessageAction.is(action)) {
        return {
            ...state,
            textMessage: {
                ...state.textMessage,
                text: typeof action.payload === "string" 
                    ? action.payload
                    : state.textMessage.text + action.payload.native,
            },
        };
    };

    if (resetTextMessageAction.is(action)) {
        return {
            ...state,
            textMessage: {
                ...state.textMessage,
                text: "",
            },
        };
    };

    if (enableMessagesSelectModeAction.is(action)) {
        return {
            ...state,
            selectMode: true,
        };
    };

    if (disableMessagesSelectModeAction.is(action)) {
        return {
            ...state,
            selectMode: false,
        };
    };
    return state;

};