import { put, call, all, CallEffect } from "@redux-saga/core/effects";
import { UploadMetadata } from "@firebase/storage";

import { firebaseSorage } from "services";
import { openNotification } from 'features/notification/store/actions';
import { IMessageContent, IMessageAttachBase } from 'features/home/models';
import { 
    createDialogMessageAction, 
    resetMessageTextAction,
    setMessageInputEditModeAction,
    setUploadModalOpenAction,
} from "features/home/store";
import { Status, isEmptyString } from 'shared';
import { WebSocketEventHandler } from "features/websocket/helpers";
import { sendWebSocketEventAction } from "features/websocket/store";


interface IUploadedFile {
    status: Status;
    file: File;
    fileUrl: string;
    error?: Error;
};

export function* createDialogMessageWorkerSaga(action: typeof createDialogMessageAction.typeOf.action){
    const { text, attach, userId, dialogId } = action.payload;
    const messageContent: IMessageContent<IMessageAttachBase> = {
        text,
        attach: [],
    };
    try {
        if(attach?.length) {
            const response: Array<IUploadedFile> = yield all(attach.map(({ file, metadata }, i) => call(storeFileInFirebaseStorage, attach[i].type, file, metadata)));
            response.forEach(({ file, fileUrl, status }, i) => {
                if(status === Status.Error){
                    throw new Error(`Can't upload file ${file.name}`);                
                };
                messageContent.attach?.push({
                    name: file.name,
                    url: fileUrl,
                    fileType: {
                        ext: file.type.split('/')[1],
                        mime: file.type,
                    },
                    attachType: attach[i].type,
                    playable: attach[i].type === 'voice' || attach[i].type === 'video',
                    createdAt: new Date(file.lastModified).toISOString(),
                    updatedAt: new Date(file.lastModified).toISOString(),
                });
            });
        };
            
        if(isMessageEmpty(messageContent)) return;

        const event =  WebSocketEventHandler.createDialogMessageEvent({
            dialogId,
            createdBy: userId,
            content: messageContent,
        });
        yield put(sendWebSocketEventAction({ payload: event }));
        yield put(setMessageInputEditModeAction({ payload: false }));
        yield put(resetMessageTextAction({ payload: null }));
        yield put(setUploadModalOpenAction({ payload: false }));
    } catch (error: any) {
        console.log(error);   
        yield put(openNotification({ payload: { message: error.message, variant: 'error' } }));
    };
};



function* storeFileInFirebaseStorage(folder: string, file: File, metadata?: UploadMetadata): Generator<CallEffect<string>, IUploadedFile, string>{
    try {
        const fileUrl: string = yield call(firebaseSorage.storeFile, folder, file, metadata);
        return { status: Status.Success, file, fileUrl };
    } catch (error: any) {
        console.log(error);  
        return { status: Status.Error, file, fileUrl: '', error };
    };
};

function isMessageEmpty(content: IMessageContent<IMessageAttachBase>): boolean{
    if(isEmptyString(content.text) && !content.attach?.length) return true;
    return false;
};