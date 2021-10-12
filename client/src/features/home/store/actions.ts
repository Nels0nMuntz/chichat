import { defineAction } from "rd-redux-utils";
import { Status } from "shared";
import { 
    IDialog, 
    IFetchAllDialogsResponse, 
    IFetchAllMessagesRequest,
    IFetchAllMessagesResponse,
    ISendTextMessageRequest,
} from "../models";

export const setHomeStateAction = defineAction<{ payload: Status }>("SET_HOME_STATE");

// fetch/send
export const fetchInitDataAction = defineAction<{}>("FETCH_INIT_DATA");

export const fetchAllMessagesAction = defineAction<{ payload: IFetchAllMessagesRequest }>("FETCH_DIALOG_MESSAGES");

export const sentTextMessageAction = defineAction<{ payload: ISendTextMessageRequest }>("SENT_TEXT_MESSAGE");

// dialogs
export const setDialogsStatusAction = defineAction<{ payload: Status }>("SET_DIALOGS_STATUS");

export const setDialogsListAction = defineAction<{ payload: IFetchAllDialogsResponse }>("SET_DIALOGS_LIST");

export const setSelectedDialogAction = defineAction<{ payload: IDialog | null }>("SET_SELECTED_DIALOG");

// messages
export const setMessagesStatusAction = defineAction<{ payload: Status }>("SET_MESSAGES_STATUS");

export const setMessagesListAction = defineAction<{ payload: IFetchAllMessagesResponse }>("SET_MESSAGES_LIST");

export const setTextMessageAction = defineAction<{ payload: string }>("SET_TEXT_MESASGE");