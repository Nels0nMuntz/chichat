import { AppState } from "app-state";


const selectState = (state: AppState) => state.sidebar;

export const selectSidebarStatus = (state: AppState) => selectState(state).status;

export const selectSidebarVisibility = (state: AppState) => selectState(state).visibility;

export const selectSidebarSearchField = (state: AppState) => selectState(state).search.field;

export const selectActiveTab = (state: AppState) => selectState(state).search.activeTab;

export const selectSearchUsers = (state: AppState) => selectState(state).search.users;

export const selectSearchMode = (state: AppState) => selectState(state).search.searchMode;