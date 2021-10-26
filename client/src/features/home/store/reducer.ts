import { Action } from 'redux';
import { IUser, Status, SearchGroups } from 'shared';
import { IMessage, IDialog } from '../models';

import {
    setHomeStateAction,
    setDialogsStatusAction,
    setDialogsListAction,
    setSelectedDialogAction,
    setHomeUserDataAction,
    addLastMessageAction,
    setWebSocketAction,
    setSidebarStatusAction,
    setSidebarVisibilityAction,
    setSidebarSearchFieldValueAction,
    setSidebarSearchFieldTypingAction,
    setActiveSearchTabAction,
    setSidebarSearchUsersAction,
    resetSidebarSearchAction,
    setSidebarSearchModeAction,
    addDialogsListItemAction,
} from './';


interface IHomeState {
    status: Status,
    dialogs: {
        status: Status;
        list: Array<IDialog>;
        selectedDialog: IDialog | null;
    };
    sidebar: {
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
    user: IUser;
    webSocket: {
        socket: WebSocket | null;
    };
};

const initState: IHomeState = {
    status: Status.Initial,
    dialogs: {
        status: Status.Initial,
        list: [],
        selectedDialog: null,
    },
    sidebar: {
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
    },
    user: {
        userId: "613f475871e72072d08b5998",
        email: "",
        firstName: "",
        phoneNumber: "",
    },
    webSocket: {
        socket: null,
    },
};

export const homeReducer = (state: IHomeState = initState, action: Action): IHomeState => {

    if (setHomeStateAction.is(action)) {
        return {
            ...state,
            status: action.payload,
        };
    };

    // dialogs

    if (setDialogsStatusAction.is(action)) {
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                status: action.payload,
            },
        };
    };

    if (setDialogsListAction.is(action)) {
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                list: action.payload.dialogs.map(({ dialogId, member, messages }) => ({
                    dialogId,
                    member,
                    lastMessage: messages[0],
                })),
            },
        };
    };

    if (setSelectedDialogAction.is(action)) {
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                selectedDialog: action.payload,
            },
        };
    };

    if (addDialogsListItemAction.is(action)) {
        const { dialogId, member, messages } = action.payload
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                list: [
                    { dialogId, member, lastMessage: messages[0] },
                    ...state.dialogs.list,
                ]
            }
        };
    }

    if (addLastMessageAction.is(action)) {
        const dialog = state.dialogs.list.filter(dialog => dialog.dialogId === action.payload.dialogId)[0];
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                list: [
                    ...state.dialogs.list.filter(dialog => dialog.dialogId !== action.payload.dialogId),
                    {
                        ...dialog,
                        lastMessage: action.payload,
                    },
                ],
            },
        }
    };

    // sidebar

    if (setSidebarStatusAction.is(action)) {
        return {
            ...state,
            sidebar: {
                ...state.sidebar,
                status: action.payload,
            }
        };
    };

    if (setSidebarVisibilityAction.is(action)) {
        return {
            ...state,
            sidebar: {
                ...state.sidebar,
                visibility: action.payload,
            }
        };
    };

    if (setSidebarSearchFieldValueAction.is(action)) {
        return {
            ...state,
            sidebar: {
                ...state.sidebar,
                search: {
                    ...state.sidebar.search,
                    field: {
                        ...state.sidebar.search.field,
                        value: action.payload,
                    }
                },
            }
        };
    };

    if (setSidebarSearchFieldTypingAction.is(action)) {
        return {
            ...state,
            sidebar: {
                ...state.sidebar,
                search: {
                    ...state.sidebar.search,
                    field: {
                        ...state.sidebar.search.field,
                        typing: action.payload,
                    }
                }
            }
        };
    };

    if (setActiveSearchTabAction.is(action)) {
        return {
            ...state,
            sidebar: {
                ...state.sidebar,
                search: {
                    ...state.sidebar.search,
                    activeTab: action.payload,
                }
            }
        };
    };

    if (setSidebarSearchUsersAction.is(action)) {
        return {
            ...state,
            sidebar: {
                ...state.sidebar,
                search: {
                    ...state.sidebar.search,
                    users: action.payload,
                }
            }
        };
    };

    if (resetSidebarSearchAction.is(action)) {
        return {
            ...state,
            sidebar: {
                ...state.sidebar,
                search: {
                    ...state.sidebar.search,
                    users: [],
                    messages: [],
                    field: {
                        ...state.sidebar.search.field,
                        value: "",
                    }
                }
            }
        };
    };

    if (setSidebarSearchModeAction.is(action)) {
        return {
            ...state,
            sidebar: {
                ...state.sidebar,
                search: {
                    ...state.sidebar.search,
                    searchMode: action.payload,
                }
            }
        };
    };

    // user

    if (setHomeUserDataAction.is(action)) {
        return {
            ...state,
            user: action.payload,
        };
    };

    // WebSocket

    if (setWebSocketAction.is(action)) {
        return {
            ...state,
            webSocket: {
                ...state.webSocket,
                socket: action.payload,
            }
        };
    };

    return state;

};