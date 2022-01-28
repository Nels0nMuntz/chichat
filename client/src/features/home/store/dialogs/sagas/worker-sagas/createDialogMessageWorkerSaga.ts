import { put, call, all, CallEffect } from "@redux-saga/core/effects";

import { firebaseSorage } from "services";
import { setNotification } from 'features/notification/store/actions';
import { IMessageContent } from 'features/home/models';
import { createDialogMessageAction, sendWSMessageAction, resetMessageTextAction } from "features/home/store";
import { Status, checkAttachType, isEmptyString, wsManager } from 'shared';


interface IUploadedFile {
    status: Status;
    file: File;
    fileURL: string;
    error?: Error;
};

export function* createDialogMessageWorkerSaga(action: typeof createDialogMessageAction.typeOf.action){
    const { text, attach, userId, dialogId } = action.payload;
    try {
        if(attach?.length) {
            const response: Array<IUploadedFile> = yield all(attach.map(({ file }) => call(uploadFile, file)));
            const newMessageContent: IMessageContent = {
                text,
                attach: [],
            };
            response.forEach(({ file, fileURL, status }) => {
                if(status === Status.Error){
                    throw new Error(`Can't upload file ${file.name}`);                
                };
                newMessageContent.attach?.push({
                    name: file.name,
                    url: fileURL,
                    fileType: {
                        ext: file.type.split('/')[1],
                        mime: file.type,
                    },
                    attachType: checkAttachType(file.type),
                    createdAt: new Date(file.lastModified).toISOString(),
                    updatedAt: new Date(file.lastModified).toISOString(),
                });
            });
            
            if(isMessageEmpty(newMessageContent)) return;

            const newMessage = wsManager.createMessage(dialogId, userId, newMessageContent);
            yield put(sendWSMessageAction({ payload: newMessage }));
            yield put(resetMessageTextAction({ payload: null }));
        };
    } catch (error: any) {
        console.log(error);   
        put(setNotification({ payload: { status: Status.Error, message: error.message } }));
    };
};



function* uploadFile(file: File): Generator<CallEffect<string>, IUploadedFile, string>{
    try {
        const fileURL: string = yield call(firebaseSorage.upload, file);
        return { status: Status.Success, file, fileURL };
    } catch (error: any) {
        console.log(error);  
        return { status: Status.Error, file, fileURL: '', error };
    };
};

function isMessageEmpty(content: IMessageContent): boolean{
    if(isEmptyString(content.text) && !content.attach?.length) return true;
    return false;
};