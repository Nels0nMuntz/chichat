import { takeEvery } from "@redux-saga/core/effects"
import { 
    fetchInitDataAction,
    fetchAllMessagesAction,
} from "../../actions"
import { fetchInitDataWorkerSaga } from "../worker-sagas/fetchInitDataWorkerSaga";
import { fetchAllMessagesWorkerSaga } from "../worker-sagas/fetchAllMessagesWorkerSaga";


export function* dialogsWatcherSaga(){
    yield takeEvery(fetchInitDataAction.TYPE, fetchInitDataWorkerSaga);
    yield takeEvery(fetchAllMessagesAction.TYPE, fetchAllMessagesWorkerSaga);
};