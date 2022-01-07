import { Action } from "redux";
import { Status } from "shared";
import { IDialog, IMessage } from "features/home/models";
import {
    setDialogsListAction,
    setDialogStatusAction,
    setDialogsListStatusAction,
    setActiveDialogAction,
    addNewDialogAction,
    incrementPaginationPageAction,
    setMessageTextAction,
    resetMessageTextAction,
    changeSelectModeAction,
    toggleSelectMessageAction,
    addNewMessageAction,
    setDialogMessagesAction,
    setDialogMessagesStatusAction,
} from '../';


interface IDialogsState {
    status: Status;
    list: Array<IDialog>;
};

const initialState: IDialogsState = {
    status: Status.Initial,
    list: [],
};

export const dialogsReducer = (state: IDialogsState = initialState, action: Action): IDialogsState => {

    if (setDialogsListStatusAction.is(action)) {
        return {
            ...state,
            status: action.payload,
        };
    };

    if(setDialogStatusAction.is(action)){
        return {
            ...state,
            list: state.list.map<IDialog>((dialog) => {
                return action.payload.dialogId === dialog.dialogId ? { ...dialog, status: action.payload.status } : dialog;
            })
        }
    };

    if(setDialogMessagesStatusAction.is(action)){
        return {
            ...state,
            list: [
                ...state.list.map<IDialog>(dialog => {
                    if(dialog.dialogId === action.payload.dialogId){
                        return {
                            ...dialog,
                            messages: {
                                ...dialog.messages,
                                status: action.payload.status,
                            },
                        };
                    };
                    return dialog;
                }),
            ],
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
                ...state.list.map<IDialog>(dialog => {
                    if(dialog.isActive){
                        return { ...dialog, isActive: false }
                    }
                    if(dialog.dialogId === action.payload) {
                        return  { ...dialog, isActive: true };
                    };
                    return dialog;
                }),
            ],
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
                        ? { 
                            ...dialog, 
                            messages: {
                                ...dialog.messages,
                                page: dialog.messages.page + 1,
                            },
                        }
                        : dialog;
                }),
            ]
        };
    };

    if(setMessageTextAction.is(action)){
        return {
            ...state,
            list: [
                ...state.list.map<IDialog>(dialog => {
                    if(dialog.isActive){
                        return {
                            ...dialog,
                            form: { ...dialog.form, text: action.payload },
                        };
                    };
                    return dialog;
                }),
            ],
        };
    };

    if(resetMessageTextAction.is(action)){
        return {
            ...state,
            list: [
                ...state.list.map<IDialog>(dialog => {
                    if(dialog.isActive){
                        return {
                            ...dialog,
                            form: { ...dialog.form, text: '' }
                        }
                    };
                    return dialog;
                }),
            ],
        };
    };

    if(changeSelectModeAction.is(action)){
        return {
            ...state,
            list: [
                ...state.list.map<IDialog>(dialog => {
                    if(dialog.isActive){
                        return {
                            ...dialog,
                            messages: {
                                ...dialog.messages,
                                selectMode: action.payload,
                                list: action.payload 
                                    ? dialog.messages.list 
                                    : dialog.messages.list.map<IMessage>(message => message.selected 
                                        ? { ...message, selected: false }
                                        : message),
                            },
                        };
                    };
                    return dialog;
                }),
            ],
        };
    };

    if(toggleSelectMessageAction.is(action)){
        return {
            ...state,
            list: [
                ...state.list.map<IDialog>(dialog => {
                    if(dialog.isActive){
                        return {
                            ...dialog,
                            messages: {
                                ...dialog.messages,
                                list: [
                                    ...dialog.messages.list.map(message => {
                                        if(message.messageId === action.payload.messageId) return { ...message, selected: !message.selected }
                                        return message;
                                    })
                                ]
                            },
                        };
                    };
                    return dialog;
                }),
            ],
        };
    };

    if(setDialogMessagesAction.is(action)){
        return {
            ...state,
            list: [
                ...state.list.map<IDialog>(dialog => {
                    if(dialog.dialogId === action.payload.dialogId){
                        return {
                            ...dialog,
                            messages: {
                                ...dialog.messages,
                                list: [
                                    ...dialog.messages.list,
                                    ...action.payload.messages,
                                ],
                                hasMore: action.payload.hasMore,
                            },
                        };
                    };
                    return dialog;
                }),
            ],
        };
    };

    if(addNewMessageAction.is(action)){
        return {
            ...state,
            list: [
                ...state.list.map<IDialog>(dialog => {
                    if(dialog.dialogId === action.payload.dialogId){
                        return {
                            ...dialog,
                            messages: {
                                ...dialog.messages,
                                list: [
                                    action.payload.message,
                                    ...dialog.messages.list,
                                ],
                                lastMessage: action.payload.message
                            },
                        };
                    };
                    return dialog;
                }),
            ],
        };
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