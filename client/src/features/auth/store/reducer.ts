import { Action } from "redux";
import { Status } from "shared";
import {
    setIsAuthAction,
    setSignInStatus,
    setSignUpStatus,
} from './actions';


interface IAuthState {
    isAuth: boolean,
    signin: {
        status: Status
    },
    signup: {
        status: Status
    },
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

    return state;

};