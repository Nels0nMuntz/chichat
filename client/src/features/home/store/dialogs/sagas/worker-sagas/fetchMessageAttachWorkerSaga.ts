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
                status: Status.Running,
            }
        }));
        
        const buffer: ArrayBuffer = yield firebaseSorage.getArrayBuffer(attach.url);
        const blob: Blob = yield firebaseSorage.getBlob(attach.url);
        
        // @ts-ignore
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer: AudioBuffer = yield audioContext.decodeAudioData(buffer);
        const url = URL.createObjectURL(blob); 

        yield put(setMessageAttachFileAction({
            payload: {
                messageId,
                attachId: attach.attachId,
                file: {
                    url,
                    audioBuffer,
                    audioContext,
                    status: Status.Success,
                },
            }
        }));
        // if(!buffer) {
        //     throw new Error('ArrayBuffer does not exist');
        // };
        // const url = URL.createObjectURL(blob);

        // const audio = new Audio(url);
        // audio.play();

        // const reader = new FileReader();
        // reader.onload = function () {
        //     url = this.result;
        // };
        // yield reader.readAsDataURL(blob);
        // if (!buffer) return;
        // console.log(buffer);
        // console.log(url);


        // @ts-ignore
        // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        // const audioBuffer: AudioBuffer = yield audioContext.decodeAudioData(buffer);
        // const analyser = audioContext.createAnalyser();
        // const bufferSource = audioContext.createBufferSource();
        // const duration = Number(audioBuffer.duration.toFixed(3));
        // bufferSource.buffer = audioBuffer;
        // bufferSource.connect(audioContext.destination);
        // bufferSource.connect(analyser);
        // analyser.connect(audioContext.destination);
        // yield put(setMessageAttachFileAction({
        //     payload: {
        //         messageId,
        //         attachId: attach.attachId,
        //         file: {
        //             url,
        //             audioBuffer,
        //             audioContext,
        //             status: Status.Success,
        //         },
        //     }
        // }));

    } catch (error) {
        yield put(setMessageAttachStatusAction({
            payload: {
                messageId,
                attachId: attach.attachId,
                status: Status.Error,
            }
        }));
        yield put(setNotification({
            payload: {
                status: Status.Error,
                message: `Can't load file ${attach.name}`,
            }
        }));
        console.log(error);
    };
};

function* onLoad() {

}