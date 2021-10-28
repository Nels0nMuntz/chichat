import { takeEvery } from "@redux-saga/core/effects";
import { 
    fetchMessagesAction,
    deleteMessagesInDBAction,
} from "features/home/store";
import { fetchMessagesWorkerSaga } from "../worker-sagas/fetchMessagesWorkerSaga";
import { deleteMessagesWorkerSaga } from "../worker-sagas/deleteMessagesWorkerSaga";


export function* messagesWatcherSaga(){
    yield takeEvery(fetchMessagesAction.TYPE, fetchMessagesWorkerSaga);
    yield takeEvery(deleteMessagesInDBAction.TYPE, deleteMessagesWorkerSaga);
};