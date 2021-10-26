import { AppState } from "app-state";

const selectState  = (state: AppState) => state.home;

export const selectHomeStatus = (state: AppState) => selectState(state).status;

export const selectUserData = (state: AppState) => selectState(state).user;

// dialogs
export const selectDialogsState = (state: AppState) => selectState(state).dialogs;

export const selectDialogsList = (state: AppState) => selectState(state).dialogs.list;

export const selectActiveDialog = (state: AppState) => selectState(state).dialogs.selectedDialog;

// sidebar
export const selectSidebarStatus = (state: AppState) => selectState(state).sidebar.status;

export const selectSidebarVisibility = (state: AppState) => selectState(state).sidebar.visibility;

export const selectSidebarSearchField = (state: AppState) => selectState(state).sidebar.search.field;

export const selectActiveTab = (state: AppState) => selectState(state).sidebar.search.activeTab;

export const selectSearchUsers = (state: AppState) => selectState(state).sidebar.search.users;

export const selectSearchMode = (state: AppState) => selectState(state).sidebar.search.searchMode;

// websocket
export const selecteWebSocket = (state: AppState) => selectState(state).webSocket.socket;
