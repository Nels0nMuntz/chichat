import { defineAction } from "rd-redux-utils";
import { Status } from "shared";
import { ICreateDialogRequest, IDialogResponse, IFetchAllDialogsResponse, UniqueId } from "features/home/models";


export const createDialogAction = defineAction<{ payload: ICreateDialogRequest }>("CREATE_DIALOG");

export const setDialogStatusAction = defineAction<{ payload: Status }>("SET_DIALOGS_STATUS");

export const setDialogListAction = defineAction<{ payload: IFetchAllDialogsResponse }>("SET_DIALOGS_LIST");

export const addDialogListItemAction = defineAction<{ payload: IDialogResponse }>("ADD_DIALOG_LIST_ITEM");

export const setActiveDialogAction = defineAction<{ payload: UniqueId | null }>("SET_ACTIVE_DIALOG");

export const incrementPaginationPageAction = defineAction<{ payload: { dialogId: UniqueId } }>("INCREMENT_PAGINATION_PAGE");