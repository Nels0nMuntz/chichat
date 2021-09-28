import { defineAction } from "rd-redux-utils";
import { Status } from "shared";
import { IFetchDialogsResponse } from "../models";


export const fetchDialogsAction = defineAction<{}>("FETCH_DIALOGS");

export const setDialogsStatus = defineAction<{ payload: Status }>("SET_DIALOGS_STATUS");

export const setDialogsList = defineAction<{ payload: IFetchDialogsResponse }>("SET_DIALOGS_LIST");

export const changeMessageAction = defineAction<{ payload: { value: string } }>("CHANGE_MESSAGE");