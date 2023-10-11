import { AppState } from "app-state";
import { IProfileState } from "./reducer";

export const selectProfile = (state: AppState): IProfileState => state.profile;

export const selectProfileDraft = (state: AppState) => selectProfile(state).draft;

export const selectIsDraftDifferent = (state: AppState) => selectProfile(state).isDraftDifferent;