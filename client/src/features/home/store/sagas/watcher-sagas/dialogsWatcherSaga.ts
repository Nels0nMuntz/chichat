import { takeEvery } from "@redux-saga/core/effects"
import { 
    fetchAllDialogsAction,
    fetchAllMessagesAction,
} from "../../actions"
import { fetchDialogsWorkerSaga } from "../worker-sagas/fetchDialogsWorkerSaga";
import { fetchAllMessagesWorkerSaga } from "../worker-sagas/fetchAllMessagesWorkerSaga";


export function* dialogsWatcherSaga(){
    yield takeEvery(fetchAllDialogsAction.TYPE, fetchDialogsWorkerSaga);
    yield takeEvery(fetchAllMessagesAction.TYPE, fetchAllMessagesWorkerSaga);
};