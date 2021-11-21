import { defineAction } from "rd-redux-utils";
import { Status } from "shared";
import { ICreateDialogRequest, IDialogResponse, IFetchAllDialogsResponse, UniqueId } from "features/home/models";


export const createDialogAction = defineAction<{ payload: ICreateDialogRequest }>("CREATE_DIALOG");

export const setDialogStatusAction = defineAction<{ payload: { dialogId: UniqueId, status: Status } }>("SET_DIALOG_STATUS");

export const setDialogsListStatusAction = defineAction<{ payload: Status }>("SET_DIALOGS_LIST_STATUS");

export const setDialogsListAction = defineAction<{ payload: IFetchAllDialogsResponse }>("SET_DIALOGS_LIST");

export const addNewDialogAction = defineAction<{ payload: IDialogResponse }>("ADD_NEW_DIALOG");

export const setActiveDialogAction = defineAction<{ payload: UniqueId | null }>("SET_ACTIVE_DIALOG");

export const incrementPaginationPageAction = defineAction<{ payload: { dialogId: UniqueId } }>("INCREMENT_PAGINATION_PAGE");