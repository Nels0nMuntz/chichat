import { defineAction } from "rd-redux-utils";
import { IUser, Status } from "shared";


export const setHomeStateAction = defineAction<{ payload: Status }>("SET_HOME_STATE");

// api
export const initHomeAction = defineAction<{}>("HOME_INIT");

// user
export const setHomeUserDataAction = defineAction<{ payload: IUser }>("SET_HOME_USER_DATA");