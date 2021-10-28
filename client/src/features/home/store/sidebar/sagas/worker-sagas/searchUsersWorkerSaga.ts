import { put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { userService } from 'services';
import {
    setSidebarSearchUsersAction,
} from "../../actions";
import { ISidebarSearchParams } from 'features/home/models';
import { IUser } from 'shared';


export function* searchUsersWorkerSaga(params: ISidebarSearchParams) {
    try {
        const { data, status }: AxiosResponse<Array<IUser>> = yield userService.search(params);
        if(status === 200){           
            yield put(setSidebarSearchUsersAction({ payload: data }));
        }
    } catch (error) {
        throw error;
    };
};