import { put } from "@redux-saga/core/effects";
import { AxiosResponse } from "axios";
import { messageService } from "services";
import { setSidebarSearchMessagesAction } from "../../actions";
import { ISidebarSearchParams, ISearchMessagesResponse } from "../../../models";


export function* searchMessgesWorkerSaga(params: ISidebarSearchParams){
    try {
        const { status, data }: AxiosResponse<ISearchMessagesResponse> = yield messageService.search(params);
        if(status === 200){
            yield put(setSidebarSearchMessagesAction({ payload: data }))
        }
    } catch (error: any) {
        throw error;
    };
};