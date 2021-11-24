import { Action } from "redux";
import { Status } from "shared";
import { IDialog, IMessage, UniqueId } from "features/home/models";
import {
    setDialogsListAction,
    setDialogStatusAction,
    setDialogsListStatusAction,
    setActiveDialogAction,
    addNewDialogAction,
    incrementPaginationPageAction,
    // addLastMessageAction,
    // deleteMessagesOnClientAction,
    // toggleSelectMessageAction,
    // disableMessagesSelectModeAction,
} from '../';


interface IDialogsState {
    status: Status;
    list: Array<IDialog>;
    activeDialogId: UniqueId | null;
};

const initialState: IDialogsState = {
    status: Status.Initial,
    list: [],
    activeDialogId: null,
};

export const dialogsReducer = (state: IDialogsState = initialState, action: Action): IDialogsState => {

    if (setDialogsListStatusAction.is(action)) {
        return {
            ...state,
            status: action.payload,
        };
    };

    if (setDialogsListAction.is(action)) {
        return {
            ...state,
            list: action.payload,
        };
    };

    if (setActiveDialogAction.is(action)) {
        return {
            ...state,
            list: [
                ...state.list.map(dialog => {
                    if(dialog.dialogId === state.activeDialogId) {
                        return  {
                            ...dialog,
                            messages: {
                                ...dialog.messages,
                                list: dialog.messages.list.map<IMessage>(message => message.selected ? { ...message, selected: false } : message),
                            }
                        };
                    };
                    return dialog;
                }),
            ],
            activeDialogId: action.payload,
        };
    };

    if (addNewDialogAction.is(action)) {
        return {
            ...state,
            list: [
                action.payload,
                ...state.list,
            ],
        };
    };

    if(incrementPaginationPageAction.is(action)) {
        return {
            ...state,
            list: [
                ...state.list.map<IDialog>(dialog => {
                    return dialog.dialogId === action.payload.dialogId
                        ? { ...dialog, page: dialog.page + 1 }
                        : dialog;
                }),
            ]
        };
    };

    if(setDialogStatusAction.is(action)){
        return {
            ...state,
            list: state.list.map((dialog) => {
                return action.payload.dialogId === dialog.dialogId ? { ...dialog, status: action.payload.status } : dialog;
            })
        }
    };

    // if (addLastMessageAction.is(action)) {
    //     const newMessage: IMessage = { ...action.payload, selected: false };
    //     const dialogId = action.payload.dialogId;
    //     const dialog = state.list.find(dialog => dialog.dialogId === dialogId);
    //     const dialogsList = state.list.filter(dialog => dialog.dialogId !== dialogId);
    //     if(dialog) {
    //         dialogsList.push({
    //             ...dialog,
    //             messages: [
    //                 newMessage,
    //                 ...dialog.messages,
    //             ],
    //             lastMessage: newMessage,
    //         });
    //     };
    //     return {
    //         ...state,
    //         list: dialogsList,
    //     };
    // };

    // if (deleteMessagesOnClientAction.is(action)) {
    //     const messageIds = action.payload;
    //     let dialogsList = state.list;
    //     const activeDialogId = state.activeDialogId;
    //     if (activeDialogId) {
    //         const dialog = dialogsList.find(dialog => dialog.dialogId === activeDialogId);
    //         if(dialog){
    //             const messagesList = dialog.messages.filter(message => !messageIds.some(id => id === message.messageId))
    //             const updatedDialog: IDialog = {
    //                 ...dialog,
    //                 messages: messagesList,
    //                 lastMessage: messagesList[0],
    //             };
    //             dialogsList = [...dialogsList].filter(dialog => dialog.dialogId !== activeDialogId);
    //             dialogsList.push(updatedDialog);
    //         };
    //     };
    //     return {
    //         ...state,
    //         list: dialogsList,
    //     };
    // };

    // if(toggleSelectMessageAction.is(action)) {
    //     return {
    //         ...state,
    //         list: [
    //             ...state.list.map(dialog => {
    //                 if(dialog.dialogId === action.payload.dialogId) {
    //                     return {
    //                         ...dialog,
    //                         messages: [
    //                             ...dialog.messages.map<IMessage>(message => {
    //                                 return message.messageId === action.payload.messageId ? { ...message, selected: !message.selected } : message;
    //                             }),
    //                         ],
    //                     };
    //                 };
    //                 return dialog;
    //             }),
    //         ]
    //     };
    // };

    // if(disableMessagesSelectModeAction.is(action)) {
    //     return {
    //         ...state,
    //         list: [
    //             ...state.list.map(dialog => {
    //                 if(dialog.dialogId === state.activeDialogId){
    //                     return {
    //                         ...dialog,
    //                         messages: [...dialog.messages.map(message => ({ ...message, selected: false }))],
    //                     };
    //                 };
    //                 return dialog;
    //             })
    //         ]
    //     };
    // };

    return state;

};