import { Action } from "redux";
import { Status } from "shared";
import { INotification } from "../models";
import { setNotification, dropNotification } from "./actions";


const initialState: INotification = {
    status: Status.Initial,
    isOpen: false,
    message: "",
};

export const notificationReducer = (state: INotification = initialState, action: Action): INotification => {

    if(setNotification.is(action)){
        return {
            ...action.payload,
        };
    };

    if(dropNotification.is(action)){
        return {
            ...initialState,
        };
    };

    return state;

};