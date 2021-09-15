import { defineAction } from "rd-redux-utils";
import { INotification } from "../models";

export const setNotification = defineAction<{ payload: INotification }>("SET_NOTIFICATIO");

export const dropNotification = defineAction<{}>("DROP_NOTIFICATION");