import { put, call, spawn, all } from "redux-saga/effects";
import { AxiosResponse } from 'axios';

import { firebaseSorage } from "services";
import { 
    fetchMessageAttachAction, 
    setMessageAttachFileAction,
    setMessageAttachStatusAction
} from "../../actions";
import { Status } from "shared";
import { setNotification } from 'features/notification/store';


export function* fetchMessageAttachWorkerSaga(action: typeof fetchMessageAttachAction.typeOf.action) {    
    yield all(action.payload.attach.map(function*({ attachId, url, name }){ 
        return yield spawn(fetchResource, action.payload.messageId, attachId, url, name);
    }))
};

function* fetchResource(messageId: string, attachId: string, url: string, fileName: string){
    try {
        yield put(setMessageAttachStatusAction({ payload: { messageId, attachId, status: Status.Running } }));
        const data: ArrayBuffer = yield firebaseSorage.download(url);
        yield put(setMessageAttachFileAction({ payload: { messageId, attachId, file: data } }));
        yield put(setMessageAttachStatusAction({ payload: { messageId, attachId, status: Status.Success } }));
    } catch (error) {
        yield put(setMessageAttachStatusAction({ payload: { messageId, attachId, status: Status.Error } }));
        yield put(setNotification({ payload: { status: Status.Error, message: `Can't load file ${fileName}` } }));
    };
};