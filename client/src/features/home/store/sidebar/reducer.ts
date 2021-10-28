import { Action } from "redux";
import { IMessage } from "../../models";
import { IUser, SearchGroups, Status } from "shared";
import {
    setSidebarStatusAction,
    setSidebarVisibilityAction,
    setSidebarSearchFieldValueAction,
    setSidebarSearchFieldTypingAction,
    setActiveSearchTabAction,
    setSidebarSearchUsersAction,
    resetSidebarSearchAction,
    setSidebarSearchModeAction,
} from './actions';


interface ISidebarState {
    status: Status;
    visibility: boolean;
    search: {
        field: {
            value: string;
            typing: boolean;
        },
        activeTab: SearchGroups,
        searchMode: boolean;
        users: Array<IUser>,
        messages: Array<IMessage>,
    };
};

const initialState: ISidebarState = {
    status: Status.Initial,
    visibility: true,
    search: {
        field: {
            value: '',
            typing: false,
        },
        activeTab: SearchGroups.Chats,
        searchMode: false,
        users: [],
        messages: [],
    },
};

export const sidebarReducer = (state: ISidebarState = initialState, action: Action): ISidebarState => {

    if (setSidebarStatusAction.is(action)) {
        return {
            ...state,
            status: action.payload,
        };
    };

    if (setSidebarVisibilityAction.is(action)) {
        return {
            ...state,
            visibility: action.payload,
        };
    };

    if (setSidebarSearchFieldValueAction.is(action)) {
        return {
            ...state,
            search: {
                ...state.search,
                field: {
                    ...state.search.field,
                    value: action.payload,
                }
            },
        };
    };

    if (setSidebarSearchFieldTypingAction.is(action)) {
        return {
            ...state,
            search: {
                ...state.search,
                field: {
                    ...state.search.field,
                    typing: action.payload,
                }
            }
        };
    };

    if (setActiveSearchTabAction.is(action)) {
        return {
            ...state,
            search: {
                ...state.search,
                activeTab: action.payload,
            }
        };
    };

    if (setSidebarSearchUsersAction.is(action)) {
        return {
            ...state,
            search: {
                ...state.search,
                users: action.payload,
            }
        };
    };

    if (resetSidebarSearchAction.is(action)) {
        return {
            ...state,
            search: {
                ...state.search,
                users: [],
                messages: [],
                field: {
                    ...state.search.field,
                    value: "",
                }
            }
        };
    };

    if (setSidebarSearchModeAction.is(action)) {
        return {
            ...state,
            search: {
                ...state.search,
                searchMode: action.payload,
            },
        };
    };

    return state;

};