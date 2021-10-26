import { defineAction } from "rd-redux-utils";
import { BaseEmoji } from "emoji-mart";
import { Status } from "shared";
import { 
    IFetchAllMessagesRequest, 
    IFetchAllMessagesResponse, 
    IMessage, 
    IMessageResponse,
} from "features/home/models";


export const fetchAllMessagesAction = defineAction<{ payload: IFetchAllMessagesRequest }>("FETCH_DIALOG_MESSAGES");

export const setMessagesStatusAction = defineAction<{ payload: Status }>("SET_MESSAGES_STATUS");

export const setMessagesListAction = defineAction<{ payload: IFetchAllMessagesResponse }>("SET_MESSAGES_LIST");

export const setTextMessageAction = defineAction<{ payload: string | BaseEmoji }>("SET_TEXT_MESASGE");

export const resetTextMessageAction = defineAction<{ payload: null }>("RESET_TEXT_MESASGE");

export const addLastMessageAction = defineAction<{ payload: IMessageResponse }>("ADD_LAST_MESASGE");

export const enableMessagesSelectModeAction = defineAction<{ payload: null }>("ENABLE_MESSAGES_SELECT_MODE");

export const disableMessagesSelectModeAction = defineAction<{ payload: null }>("DISABLE_MESSAGES_SELECT_MODE");

export const toggleSelectMessageAction = defineAction<{ payload: IMessage }>("TOGGLE_SELECT_MESSAGE");

export const deleteMessagesAction = defineAction<{ payload: Array<IMessage> }>("DELETE_MESSAGES");