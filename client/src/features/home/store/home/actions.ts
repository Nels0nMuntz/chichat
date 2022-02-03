import { defineAction } from "rd-redux-utils";
import { IWSMessage, Status } from "shared";
import { 
    IFetchUserDataResponse,
} from "../../models";


export const setHomeStateAction = defineAction<{ payload: Status }>("SET_HOME_STATE");

// api
export const initHomeAction = defineAction<{}>("HOME_INIT");

// user
export const setHomeUserDataAction = defineAction<{ payload: IFetchUserDataResponse }>("SET_HOME_USER_DATA");

// websocket
export const setWebSocketAction = defineAction<{ payload: WebSocket }>("SET_WEBSOCKET");

export const sendWSMessageAction = defineAction<{ payload: IWSMessage }>("SEND_WS_MESSGE");