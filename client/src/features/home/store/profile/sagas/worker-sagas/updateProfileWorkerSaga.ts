import { call, select, put } from '@redux-saga/core/effects';

import { firebaseSorage, userService } from 'services';
import { selectProfile } from '../../selectors';
import { IProfileState } from '../../reducer';
import { IUser, Status } from 'shared';
import { UploadMetadata } from 'firebase/storage';
import { IStoreFileResult, IUpdateUserDataRequest } from 'features/home/models';
import { setProfile, setProfilePhoto } from '../../actions';
import { AxiosResponse } from 'axios';
import { setHomeUserDataAction } from 'features/home/store/home/actions';
import { openNotification } from "features/notification/store";

export function* updateProfileWorkerSaga() {
    try {
        const profile: IProfileState = yield select(selectProfile);

        if (isProfilePhotoDifferent(profile) && profile.photoFile) {
            const { status, file, fileUrl }: IStoreFileResult = yield call<typeof storeProfilePhoto>(
                storeProfilePhoto,
                profile.photoFile
            );
            if (status === Status.Error) {
                throw new Error(`Can't upload file ${file.name}`);
            }
            yield put(setProfilePhoto({ payload: { file, previewUrl: fileUrl } }));
        }
        if (isProfileFullnameDifferent(profile)) {
            yield call<typeof updateUserData>(updateUserData, {
                firstName: profile.draft.firstname,
                lastName: profile.draft.lastname,
                photo: profile.draft.photo,
            });
        } else {
            yield call<typeof updateUserData>(updateUserData, {
                photo: profile.draft.photo,
            });
        }
    } catch (error: any) {
        console.log(error);
        yield put(
            openNotification({
                payload: { message: error.message, variant: 'error' },
            })
        );
    }
}

async function storeProfilePhoto(file: File, metadata?: UploadMetadata) {
    const folder = 'avatars';
    try {
        const fileUrl: string = await firebaseSorage.storeFile(folder, file, metadata);
        return { status: Status.Success, file, fileUrl };
    } catch (error: any) {
        console.log(error);
        return { status: Status.Error, file, fileUrl: '', error };
    }
}

function* updateUserData(data: IUpdateUserDataRequest) {
    const response: AxiosResponse = yield userService.updateUserData({
        firstName: data.firstName,
        lastName: data.lastName,
        photo: data.photo,
    });

    if (response.status === 200) {
        const { status, data }: AxiosResponse<IUser> = yield userService.getUserData();
        if (status === 200) {
            yield put(setHomeUserDataAction({ payload: data }));
            yield put(
                setProfile({
                    payload: {
                        firstname: data.firstName,
                        lastname: data.lastName,
                        photo: '',
                    },
                })
            );
        }
    }
}

function isProfilePhotoDifferent(values: IProfileState) {
    return values.original.photo === values.draft.photo;
}
function isProfileFullnameDifferent(values: IProfileState) {
    return values.original.firstname === values.draft.firstname || values.original.lastname === values.draft.lastname;
}
