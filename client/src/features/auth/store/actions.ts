import { defineAction } from "rd-redux-utils";
import { Status } from "shared";
import { ISignInRequest, ISignUpRequest } from "../models";


// signin
export const signInAction = defineAction<{ payload: ISignInRequest }>("AUTH_SIGNIN");

export const setSignInStatus = defineAction<{ payload: Status }>("SET_SIGNIN_STATUS");

// signup
export const signUpAction = defineAction<{ payload: ISignUpRequest }>("AUTH_SIGNUP");

export const setSignUpStatus = defineAction<{ payload: Status }>("SET_SIGNUP_STATUS");