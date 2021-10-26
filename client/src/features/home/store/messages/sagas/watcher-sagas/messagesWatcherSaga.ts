import { takeEvery } from "@redux-saga/core/effects";
import { 
    fetchAllMessagesAction,
    deleteMessagesAction,
} from "features/home/store";
import { fetchAllMessagesWorkerSaga } from "../worker-sagas/fetchAllMessagesWorkerSaga";
import { deleteMessagesWorkerSaga } from "../worker-sagas/deleteMessagesWorkerSaga";


export function* messagesWatcherSaga(){
    yield takeEvery(fetchAllMessagesAction.TYPE, fetchAllMessagesWorkerSaga);
    yield takeEvery(deleteMessagesAction.TYPE, deleteMessagesWorkerSaga);
};