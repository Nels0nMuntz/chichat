import { defineAction } from "rd-redux-utils";
import { UploadMetadata } from "firebase/storage";

import { IProfileStateValues } from "./reducer"

export const setProfile = defineAction<{ payload: IProfileStateValues }>("SET_PROFILE");
export const resetProfile = defineAction<{}>("RESET_PROFILE");
export const setProfileOriginalFromDraft = defineAction<{}>("SET_PROFILE_ORIGINAL_FROM_DRAFT");
export const setProfileFirstname = defineAction<{ payload: string }>("SET_PROFILE_FIRSTNAME");
export const setProfileLastname = defineAction<{ payload: string }>("SET_PROFILE_LASTNAME");
export const setProfilePhoto = defineAction<{ payload: { previewUrl: string, file: File } }>("SET_PROFILE_PHOTO");
export const updateProfile = defineAction<{}>("UPDATE_PROFILE");
export const storeProfilePhoto = defineAction<{ payload: { file: File, metadata?: UploadMetadata } }>("STORE_PROFILE_PHOTO")