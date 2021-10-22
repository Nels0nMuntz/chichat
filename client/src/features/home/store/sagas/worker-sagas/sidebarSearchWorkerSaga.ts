import { call, fork, put } from "@redux-saga/core/effects";
import { ISidebarSearchParams } from "../../../models";
import { 
    sidebarSearchAction,
    setSidebarStatusAction,
} from "../../actions";
import { SearchGroups, Status } from 'shared';
import { setNotification } from "features/notification/store";
import { searchUsersWorkerSaga } from "./searchUsersWorkerSaga";
import { searchMessgesWorkerSaga } from "./searchMessagesWorkerSaga";


export function* sidebarSearchWorkerSaga(action: typeof sidebarSearchAction.typeOf.action){
    const params = action.payload;
    try {
        yield put(setSidebarStatusAction({ payload: Status.Running }));
        if(params.group = SearchGroups.Chats){
            yield call(searchInChats, params);
        }else{
            yield call(searchMessgesWorkerSaga, params);
        }
        yield put(setSidebarStatusAction({ payload: Status.Success }));
    } catch (error: any) {
        yield put(setSidebarStatusAction({ payload: Status.Error }));
        yield put(setNotification({
            payload: {
                status: Status.Error,
                message: error.message,
            },
        }));
    };
};

function* searchInChats(params: ISidebarSearchParams){
    yield fork(searchUsersWorkerSaga, params);
    // yield fork(searchMessgesWorkerSaga, params);
};