import { defineAction } from "rd-redux-utils";
import { IUser, Status } from "shared";
import { ISignInRequest, ISignUpRequest, SignUpFormErrors, SignInFormErrors } from "../models";


export const checkAuthAction = defineAction<{}>("CHECK_AUTH");

export const setIsAuthAction = defineAction<{ payload: boolean }>("SET_IS_AUTH");

export const setUserAction = defineAction<{ payload: IUser }>("SET_USER_DATA")

// signin
export const signInAction = defineAction<{ payload: ISignInRequest }>("AUTH_SIGNIN");

export const setSignInStatus = defineAction<{ payload: Status }>("SET_SIGNIN_STATUS");

export const setSignInErrors = defineAction<{ payload: SignInFormErrors }>("SET_SIGNIN_ERRORS");

// signup
export const signUpAction = defineAction<{ payload: ISignUpRequest }>("AUTH_SIGNUP");

export const setSignUpStatus = defineAction<{ payload: Status }>("SET_SIGNUP_STATUS");

export const setSignUpErrors = defineAction<{ payload: SignUpFormErrors }>("SET_SIGNUP_ERRORS");