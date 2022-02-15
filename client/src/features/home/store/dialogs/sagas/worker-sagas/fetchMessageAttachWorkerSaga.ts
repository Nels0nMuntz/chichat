import { put } from "redux-saga/effects";

import { firebaseSorage } from "services";
import { FullMetadata } from "firebase/storage";
import {
    fetchMessageAttachVoiceAction,
    setMessageAttachVoiceAction,
    setMessageAttachStatusAction
} from "../../actions";
import { Status } from "shared";
import { openNotification } from 'features/notification/store';


export function* fetchMessageAttachVoiceWorkerSaga(action: typeof fetchMessageAttachVoiceAction.typeOf.action) {
    const { messageId, attachId, attachFileUrl } = action.payload;
    try {
        yield put(setMessageAttachStatusAction({
            payload: {
                messageId,
                attachId,
                status: Status.Running,
            }
        }));
        
        const buffer: ArrayBuffer = yield firebaseSorage.getArrayBuffer(attachFileUrl);
        const metadata: FullMetadata = yield firebaseSorage.getMetadata(attachFileUrl);
        const blob: Blob = yield firebaseSorage.getBlob(attachFileUrl);
        const url = URL.createObjectURL(blob);
        
        // @ts-ignore
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer: AudioBuffer = yield audioContext.decodeAudioData(buffer);

        console.log({
            audioBuffer,
            audioContext,
            duration: metadata.customMetadata && +metadata.customMetadata.duration,
        });

        yield put(setMessageAttachVoiceAction({
            payload: {
                messageId,
                attachId,
                attachFile: {
                    audioBuffer,
                    audioContext,
                    urlFromBlob: url,
                    duration: metadata.customMetadata && +metadata.customMetadata.duration,
                }
            }
        }));
        yield put(setMessageAttachStatusAction({
            payload: {
                messageId,
                attachId,
                status: Status.Success,
            }
        }));

    } catch (error: any) {
        yield put(setMessageAttachStatusAction({
            payload: {
                messageId,
                attachId,
                status: Status.Error,
            }
        }));
        yield put(openNotification({ payload: { message: "Message attachment loading faild", variant: 'error' } }));
        console.log(error);
    };
};