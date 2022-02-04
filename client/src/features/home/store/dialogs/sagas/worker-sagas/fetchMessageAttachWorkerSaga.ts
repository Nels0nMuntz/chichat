import { put } from "redux-saga/effects";

import { firebaseSorage } from "services";
import {
    fetchMessageAttachAction,
    setMessageAttachFileAction,
    setMessageAttachStatusAction
} from "../../actions";
import { Status } from "shared";
import { setNotification } from 'features/notification/store';


export function* fetchMessageAttachWorkerSaga(action: typeof fetchMessageAttachAction.typeOf.action) {
    const { messageId, attach } = action.payload;
    try {
        yield put(setMessageAttachStatusAction({
            payload: {
                messageId,
                attachId: attach.attachId,
                status: Status.Running
            }
        }));
        const data: ArrayBuffer = yield firebaseSorage.download(attach.url);
        yield put(setMessageAttachStatusAction({
            payload: {
                messageId,
                attachId: attach.attachId,
                status: Status.Success
            }
        }));
        yield put(setMessageAttachFileAction({
            payload: {
                messageId,
                attachId: attach.attachId,
                file: data
            }
        }));
    } catch (error) {
        yield put(setMessageAttachStatusAction({
            payload: {
                messageId,
                attachId: attach.attachId,
                status: Status.Error
            }
        }));
        yield put(setNotification({
            payload: {
                status: Status.Error,
                message: `Can't load file ${attach.name}`
            }
        }));
    };
};