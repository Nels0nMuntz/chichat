import { defineAction } from "rd-redux-utils";
import { IUser, IWSMessage, Status, SearchGroups } from "shared";
import { 
    IDialog,
    IDialogResponse, 
    IFetchAllDialogsResponse, 
    ISendTextMessageRequest,
    IFetchUserDataResponse,
    IMessageResponse,
    ISidebarSearchParams,
    ICreateDialogRequest,
} from "../models";


export const setHomeStateAction = defineAction<{ payload: Status }>("SET_HOME_STATE");

// api
export const initHomeAction = defineAction<{}>("HOME_INIT");

export const sidebarSearchAction = defineAction<{ payload: ISidebarSearchParams }>("SIDEBAR_SEARCH");

export const sentTextMessageAction = defineAction<{ payload: ISendTextMessageRequest }>("SENT_TEXT_MESSAGE");

export const createDialogAction = defineAction<{ payload: ICreateDialogRequest }>("CREATE_DIALOG");

// dialogs
export const setDialogsStatusAction = defineAction<{ payload: Status }>("SET_DIALOGS_STATUS");

export const setDialogsListAction = defineAction<{ payload: IFetchAllDialogsResponse }>("SET_DIALOGS_LIST");

export const addDialogsListItemAction = defineAction<{ payload: IDialogResponse }>("ADD_DIALOG_LIST_ITEM");

export const setSelectedDialogAction = defineAction<{ payload: IDialog | null }>("SET_SELECTED_DIALOG");

// sidebar
export const setSidebarStatusAction = defineAction<{ payload: Status }>("SET_SIDEBAR_STATUS");

export const setSidebarSearchFieldValueAction = defineAction<{ payload: string }>("SET_SIDEBAR_SEARCH_FIELD_VALUE");

export const setSidebarSearchFieldTypingAction = defineAction<{ payload: boolean }>("SET_SIDEBAR_SEARCH_FIELD_TYPING");

export const setSidebarVisibilityAction = defineAction<{ payload: boolean }>("SET_SIDEBAR_VISIBILITY");

export const setActiveSearchTabAction = defineAction<{ payload: SearchGroups }>("SET_ACTIVE_SEARCH_TAB");

export const setSidebarSearchUsersAction = defineAction<{ payload: Array<IUser> }>("SET_SIDEBAR_SEARCH_USERS");

export const setSidebarSearchMessagesAction = defineAction<{ payload: Array<IMessageResponse> }>("SET_SIDEBAR_SEARCH_MESSAGES");

export const resetSidebarSearchAction = defineAction<{ payload: null }>("RESET_SIDEBAR_SEARCH");

export const setSidebarSearchModeAction = defineAction<{ payload: boolean }>("SET_SIDEBAR_SEARCH_MODE");

// user
export const setHomeUserDataAction = defineAction<{ payload: IFetchUserDataResponse }>("SET_HOME_USER_DATA");

// websocket
export const setWebSocketAction = defineAction<{ payload: WebSocket }>("SET_WEBSOCKET");

export const sendWSMessageAction = defineAction<{ payload: IWSMessage }>("SEND_WS_MESSGE");