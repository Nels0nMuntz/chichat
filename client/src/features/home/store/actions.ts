import { defineAction } from "rd-redux-utils";
import { Status } from "shared";
import { 
    IDialog, 
    IFetchAllDialogsResponse, 
    IFetchAllMessagesRequest,
    IFetchAllMessagesResponse,
} from "../models";


export const fetchAllDialogsAction = defineAction<{}>("FETCH_DIALOGS");

export const fetchAllMessagesAction = defineAction<{ payload: IFetchAllMessagesRequest }>("FETCH_DIALOG_MESSAGES");

export const setDialogsStatusAction = defineAction<{ payload: Status }>("SET_DIALOGS_STATUS");

export const setDialogsListAction = defineAction<{ payload: IFetchAllDialogsResponse }>("SET_DIALOGS_LIST");

export const setSelectedDialogAction = defineAction<{ payload: IDialog | null }>("SET_SELECTED_DIALOG");

export const changeMessageAction = defineAction<{ payload: { value: string } }>("CHANGE_MESSAGE");

export const setMessagesStatusAction = defineAction<{ payload: Status }>("SET_MESSAGES_STATUS");

export const setMessagesListAction = defineAction<{ payload: IFetchAllMessagesResponse }>("SET_MESSAGES_LIST");