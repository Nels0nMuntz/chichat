import { AppState } from "app-state";


const selectState  = (state: AppState) => state.dialogs;

export const selectDialogsStatus = (state: AppState) => selectState(state).status;

export const selectDialogsList = (state: AppState) => selectState(state).list;

export const selectActiveDialog = (state: AppState) => selectState(state).list.find(dialog => dialog.isActive);