import { Action } from "redux";

import { INotification } from "../models";
import { openNotification, closeNotification, removeNotification } from "./actions";


interface INotificationState {
    notifications: Array<INotification>;
};

const initialState: INotificationState = {
    notifications: [],
};

export const notificationReducer = (state: INotificationState = initialState, action: Action): INotificationState => {

    if(openNotification.is(action)) {
        return {
            ...state,
            notifications: [
                ...state.notifications,
                {
                    key: Date.now().toString(),
                    message: action.payload.message,
                    dismissed: false,
                    options: {
                        variant: action.payload.variant,
                    }
                }
            ]
        }
    };

    if(closeNotification.is(action)) {
        return {
            ...state,
            notifications: state.notifications.map<INotification>(n => n.key === action.payload.key ? { ...n, dismissed: true } : n),
        }
    };

    if(removeNotification.is(action)) {
        return {
            ...state,
            notifications: state.notifications.filter(({ key }) => key !== action.payload.key),
        };
    };

    return state;

};