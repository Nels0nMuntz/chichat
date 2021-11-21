import { defineAction } from "rd-redux-utils";
import { BaseEmoji } from "emoji-mart";
// import { Status } from "shared";
import { 
    IFetchMessagesRequest, 
    // IFetchMessagesResponse, 
    IMessage, 
    IMessageResponse,
    UniqueId,
} from "features/home/models";


export const fetchMessagesAction = defineAction<{ payload: IFetchMessagesRequest }>("FETCH_DIALOG_MESSAGES");

// export const setMessagesStatusAction = defineAction<{ payload: Status }>("SET_MESSAGES_STATUS");

// export const setMessagesListAction = defineAction<{ payload: IFetchMessagesResponse }>("SET_MESSAGES_LIST");

export const setTextMessageAction = defineAction<{ payload: string | BaseEmoji }>("SET_TEXT_MESASGE");

export const resetTextMessageAction = defineAction<{ payload: null }>("RESET_TEXT_MESASGE");

export const addLastMessageAction = defineAction<{ payload: IMessageResponse }>("ADD_LAST_MESASGE");

export const enableMessagesSelectModeAction = defineAction<{ payload: null }>("ENABLE_MESSAGES_SELECT_MODE");

export const disableMessagesSelectModeAction = defineAction<{ payload: null }>("DISABLE_MESSAGES_SELECT_MODE");

export const toggleSelectMessageAction = defineAction<{ payload: IMessage }>("TOGGLE_SELECT_MESSAGE");

export const deleteMessagesInDBAction = defineAction<{ payload: Array<UniqueId> }>("DELETE_MESSAGES_IN_DB");

export const deleteMessagesOnClientAction = defineAction<{ payload: Array<UniqueId> }>("DELETE_MESSAGES_ON_CLIENT");