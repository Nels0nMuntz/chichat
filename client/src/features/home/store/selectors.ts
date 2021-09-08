import { AppState } from "app-state";

const selectState  = (state: AppState) => state.home;

export const selectValue = (state: AppState) => selectState(state).messageInput.value;