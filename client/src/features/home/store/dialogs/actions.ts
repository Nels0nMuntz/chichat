import { defineAction } from "rd-redux-utils";
import { Status, UniqueId, PaginationLimit } from "shared";
import { ICreateDialogRequest, IDialog, IDialogAttach, IMessage } from "features/home/models";
import { BaseEmoji } from "emoji-mart";


// dialogs
export const fetchDialogMessagesAction = defineAction<{ payload: {
    dialogId: UniqueId,
    page: number,
    limit: PaginationLimit,
} }>("FETCH_DIALOG_MESSAGES");

export const createDialogAction = defineAction<{ payload: ICreateDialogRequest }>("CREATE_DIALOG");

export const setDialogStatusAction = defineAction<{ payload: { dialogId: UniqueId, status: Status } }>("SET_DIALOG_STATUS");

export const setDialogsListStatusAction = defineAction<{ payload: Status }>("SET_DIALOGS_LIST_STATUS");

export const setDialogMessagesStatusAction = defineAction<{ payload: { dialogId: UniqueId, status: Status } }>("SET_DIALOG_MESSAGES_STATUS");

export const setDialogsListAction = defineAction<{ payload: Array<IDialog> }>("SET_DIALOGS_LIST");

export const addNewDialogAction = defineAction<{ payload: IDialog }>("ADD_NEW_DIALOG");

export const setActiveDialogAction = defineAction<{ payload: UniqueId | null }>("SET_ACTIVE_DIALOG");

export const incrementPaginationPageAction = defineAction<{ payload: { dialogId: UniqueId } }>("INCREMENT_PAGINATION_PAGE");

// messages
export const setMessageTextAction = defineAction<{ payload: string }>("SET_MESSAGE_TEXT");

export const setMessageEmojiAction = defineAction<{ payload: BaseEmoji }>("SET_MESSAGE_EMOJI");

export const resetMessageTextAction = defineAction<{ payload: null }>("RESET_MESSAGE_TEXT");

export const changeSelectModeAction = defineAction<{ payload: boolean }>("CHANGE_SELECT_MODE");

export const toggleSelectMessageAction = defineAction<{ payload: IMessage }>("TOGGLE_SELECT_MESSAGE");

export const setDialogMessagesAction = defineAction<{ payload: { dialogId: UniqueId, messages: Array<IMessage>, hasMore: boolean } }>("SET_DIALOG_MESSAGES");

export const addNewMessageAction = defineAction<{ payload: { dialogId: UniqueId, message: IMessage } }>("ADD_NEW_MESSAGE");

// upload modal
export const setUploadModalSendStatusAction = defineAction<{ payload: Status }>("SET_UPLOAD_MODAL_SEND_STATUS");

export const setUploadModalUploadStatusAction = defineAction<{ payload: Status }>("SET_UPLOAD_MODAL_UPLOAD_STATUS");

export const setUploadModalOpenAction = defineAction<{ payload: boolean }>("SET_UPLOAD_MODAL_OPEN");

export const setUploadModalMessageTextAction = defineAction<{ payload: string }>("SET_UPLOAD_MODAL_MESSAGE_TEXT");

export const setUploadModalAttachAction = defineAction<{ payload: Array<IDialogAttach> }>("SET_UPLOAD_MODAL_ATTACH");

export const uploadFilesAction = defineAction<{ payload: FileList }>("UPLOAD_FILES");

export const resetUploadModalAction = defineAction<{ payload: null }>("RESET_UPLOAD_MODAL");