import { defineAction } from "rd-redux-utils";
import { IUser, SearchGroups, Status } from "shared";
import { IMessageResponse, ISidebarSearchParams } from "../../models";


export const sidebarSearchAction = defineAction<{ payload: ISidebarSearchParams }>("SIDEBAR_SEARCH");

export const setSidebarStatusAction = defineAction<{ payload: Status }>("SET_SIDEBAR_STATUS");

export const setSidebarSearchFieldValueAction = defineAction<{ payload: string }>("SET_SIDEBAR_SEARCH_FIELD_VALUE");

export const setSidebarSearchFieldTypingAction = defineAction<{ payload: boolean }>("SET_SIDEBAR_SEARCH_FIELD_TYPING");

export const setSidebarVisibilityAction = defineAction<{ payload: boolean }>("SET_SIDEBAR_VISIBILITY");

export const setActiveSearchTabAction = defineAction<{ payload: SearchGroups }>("SET_ACTIVE_SEARCH_TAB");

export const setSidebarSearchUsersAction = defineAction<{ payload: Array<IUser> }>("SET_SIDEBAR_SEARCH_USERS");

export const setSidebarSearchMessagesAction = defineAction<{ payload: Array<IMessageResponse> }>("SET_SIDEBAR_SEARCH_MESSAGES");

export const resetSidebarSearchAction = defineAction<{ payload: null }>("RESET_SIDEBAR_SEARCH");

export const setSidebarSearchModeAction = defineAction<{ payload: boolean }>("SET_SIDEBAR_SEARCH_MODE");