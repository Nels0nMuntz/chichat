import { Action } from 'redux';

import { setProfile, setProfileOriginalFromDraft, setProfileFirstname, setProfileLastname, setProfilePhoto, resetProfile } from './actions';

export interface IProfileStateValues {
    photo: string;
    firstname: string;
    lastname?: string;
}

export interface IProfileState {
    original: IProfileStateValues;
    draft: IProfileStateValues;
    isDraftDifferent: boolean;
    photoFile: File | null;
}

const initialState: IProfileState = {
    original: {
        photo: "",
        firstname: "",
        lastname: "",
    },
    draft: {
        photo: "",
        firstname: "",
        lastname: "",
    },
    isDraftDifferent: false,
    photoFile: null,
}

const isEqual = (original: IProfileStateValues, draft: IProfileStateValues) => {
    return JSON.stringify(original) === JSON.stringify(draft);
}

export const profileReducer = (
    state: IProfileState = initialState,
    action: Action
): IProfileState => {

    if (setProfileFirstname.is(action)) {
        const newState = {
            ...state,
            draft: {
                ...state.draft,
                firstname: action.payload,
            },
        };
        const isDraftDifferent = !isEqual(newState.original, newState.draft);
        newState.isDraftDifferent = isDraftDifferent;
        return newState;
    }

    if (setProfileLastname.is(action)) {
        const newState = {
            ...state,
            draft: {
                ...state.draft,
                lastname: action.payload,
            },
        };
        const isDraftDifferent = !isEqual(newState.original, newState.draft);
        newState.isDraftDifferent = isDraftDifferent;
        return newState;
    }

    if (setProfilePhoto.is(action)) {
        const newState = {
            ...state,
            draft: {
                ...state.draft,
                photo: action.payload.previewUrl,
            },
            photoFile: action.payload.file,
        };
        const isDraftDifferent = !isEqual(newState.original, newState.draft);
        newState.isDraftDifferent = isDraftDifferent;
        return newState;
    }

    if(setProfile.is(action)) {
        return {
            ...state,
            original: { ...action.payload },
            draft: { ...action.payload },
        }
    }

    if(resetProfile.is(action)) {
        return {
            ...state,
            draft: { ...state.original },
            photoFile: null,
        }
    }

    if(setProfileOriginalFromDraft.is(action)) {
        return {
            ...state,
            original: {
                ...state.draft,
            }
        }
    }

    return state;
};
