import { AppState } from "app-state";
import { createSelector } from "reselect"


const selectState  = (state: AppState) => state.dialogs;

export const selectDialogsStatus = (state: AppState) => selectState(state).status;

export const selectDialogsList = (state: AppState) => selectState(state).list;

export const selectActiveDialog = createSelector(
    selectDialogsList,
    (list) => list.find(dialog => dialog.isActive),
);

export const selectActiveDialogId = createSelector(
    selectActiveDialog,
    (dialog) => dialog?.dialogId,
);

export const selectActiveDialogMessages = createSelector(
    selectActiveDialog,
    (dialog) => dialog?.messages,
);

export const selectActiveDialogTextMessage = createSelector(
    selectActiveDialog,
    (dialog)
)