import { defineAction } from "rd-redux-utils";
import { Status } from "shared";

export const setNotification = defineAction<{ payload: { status: Status, message: string | string[] } }>("SET_NOTIFICATION");

export const dropNotification = defineAction<{}>("DROP_NOTIFICATION");