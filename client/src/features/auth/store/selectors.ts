import { AppState } from "app-state";

const selectState = (state: AppState) => state.auth;

// signin
export const selectSigninStatus = (state: AppState) => selectState(state).signin.status; 


// signin
export const selectSignupStatus = (state: AppState) => selectState(state).signup.status; 