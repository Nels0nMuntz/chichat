import { takeEvery } from "@redux-saga/core/effects"
import { 
    fetchDialogsAction,
} from "../../actions"
import { fetchDialogsWorkerSaga } from "../worker-sagas/fetchDialogsWorkerSaga"


export function* dialogsWatcherSaga(){
    yield takeEvery(fetchDialogsAction.TYPE, fetchDialogsWorkerSaga);
};