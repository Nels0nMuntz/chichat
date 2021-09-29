import { AppState } from "app-state";

const selectState  = (state: AppState) => state.home;

export const selectDialogsState = (state: AppState) => selectState(state).dialogs;

export const selectActiveDialog = (state: AppState) => selectState(state).dialogs.selectedDialog;

export const selectMessagesState = (state: AppState) => selectState(state).messages;