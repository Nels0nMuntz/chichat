import { put } from "@redux-saga/core/effects";
import { createDialogMessageAction } from "features/home/store";

import { firebaseSorage } from "services";


export function* createDialogMessageWorkerSaga(action: typeof createDialogMessageAction.typeOf.action){
    const { userId, dialogId, text, attach } = action.payload;
    try {
        const fileURL: string = yield firebaseSorage.upload(attach)
    } catch (error) {
        
    };
};