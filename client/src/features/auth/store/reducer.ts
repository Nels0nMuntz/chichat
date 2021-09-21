import { Action } from "redux";
import { Status } from "shared";
import { SignInFormErrors, SignUpFormErrors } from "../models";
import {
    setIsAuthAction,
    setSignInStatus,
    setSignUpStatus,
    setSignInErrors,
    setSignUpErrors,
} from './actions';


interface IAuthState {
    isAuth: boolean
    signin: {
        status: Status
        errors?: SignInFormErrors
    }
    signup: {
        status: Status
        errors?: SignUpFormErrors
    }
};

const initialState: IAuthState = {
    isAuth: false,
    signin: {
        status: Status.Initial,
    },
    signup: {
        status: Status.Initial,
    },
};

export const authReducer = (state: IAuthState = initialState, action: Action): IAuthState => {

    if(setIsAuthAction.is(action)){
        return {
            ...state,
            isAuth: action.payload,
        };
    };

    if(setSignInStatus.is(action)){
        return {
            ...state,
            signin: {
                ...state.signin,
                status: action.payload,
            },
        };
    };

    if(setSignUpStatus.is(action)){
        return {
            ...state,
            signup: {
                ...state.signup,
                status: action.payload,
            },
        };
    };

    if(setSignInErrors.is(action)){
        return {
            ...state,
            signin: {
                ...state.signin,
                errors: action.payload,
            },
        };
    };

    if(setSignUpErrors.is(action)){
        return {
            ...state,
            signup: {
                ...state.signup,
                errors: action.payload,
            },
        };
    };

    return state;

};