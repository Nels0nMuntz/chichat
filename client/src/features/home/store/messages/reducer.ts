import { Action } from "redux";
import { Status } from "shared";
import { IMessage, ITextMessageContent } from "../../models";
import {
    setMessagesStatusAction,
    setMessagesListAction,
    setTextMessageAction,
    resetTextMessageAction,
    addLastMessageAction,
    enableMessagesSelectModeAction,
    disableMessagesSelectModeAction,
    toggleSelectMessageAction,
} from './actions';
import { setSelectedDialogAction } from "../actions";


interface IMessagesState {
    status: Status;
    offset: number;
    limit: number;
    list: Array<IMessage>;
    textMessage: ITextMessageContent;
    selectMode: boolean;
    selectedMessages: Array<IMessage>;
};

const initState: IMessagesState = {
    status: Status.Initial,
    offset: 0,
    limit: 10,
    list: [],
    textMessage: {
        text: "",
        type: "text",
    },
    selectMode: false,
    selectedMessages: [],
};

export const messagesReducer = (state: IMessagesState = initState, action: Action): IMessagesState => {

    if (setMessagesStatusAction.is(action)) {
        return {
            ...state,
            status: action.payload,
        };
    };

    if (setMessagesListAction.is(action)) {
        return {
            ...state,
            list: action.payload.map(message => ({ ...message, selected: false })),
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

    if (addLastMessageAction.is(action)) {
        return {
            ...state,
            list: [
                { ...action.payload, selected: false },
                ...state.list,
            ]
        }
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
            selectedMessages: [],
            list: [...state.list.map<IMessage>(message => message.selected ? { ...message, selected: false } : message)]
        };
    };

    if (toggleSelectMessageAction.is(action)) {
        const isAlreadySelected = state.selectedMessages.find(message => message.messageId === action.payload.messageId);
        const selectedMessages = isAlreadySelected 
            ? [...state.selectedMessages.filter(message => message.messageId !== action.payload.messageId)]
            : [...state.selectedMessages, action.payload];
        return {
            ...state,
            list: [
                ...state.list.map<IMessage>(message => {
                    return message.messageId === action.payload.messageId
                        ? { ...message, selected: !message.selected }
                        : message;
                })
            ],
            selectedMessages,
            selectMode: !!selectedMessages.length,
        };
    };

    if (setSelectedDialogAction.is(action)) {
        return {
            ...state,
            offset: 0,
            list: [],
        };
    };

    return state;

};