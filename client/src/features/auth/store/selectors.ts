import { AppState } from "app-state";

const selectState = (state: AppState) => state.auth;

// signin
export const selectSigninStatus = (state: AppState) => selectState(state).signin.status; 

export const selectSignInErrors = (state: AppState) => selectState(state).signin.errors;


// signin
export const selectSignupStatus = (state: AppState) => selectState(state).signup.status; 

export const selectSignUpErrors = (state: AppState) => selectState(state).signup.errors;