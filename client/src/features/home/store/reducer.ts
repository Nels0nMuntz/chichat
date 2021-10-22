import { Action } from 'redux';
import { IUser, Status, SearchGroups } from 'shared';
import { IMessage, ITextMessageContent } from '../models';
import { IDialog } from '../models/common/dialog.model';

import {
    setHomeStateAction,
    setDialogsStatusAction,
    setDialogsListAction,
    setSelectedDialogAction,
    setMessagesStatusAction,
    setMessagesListAction,
    setTextMessageAction,
    resetTextMessageAction,
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
} from './actions';


interface IHomeState {
    status: Status,
    dialogs: {
        status: Status;
        list: Array<IDialog>;
        selectedDialog: IDialog | null;
    };
    messages: {
        status: Status;
        offset: number;
        limit: number;
        list: Array<IMessage>
        textMessage: ITextMessageContent;
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
    messages: {
        status: Status.Initial,
        offset: 0,
        limit: 10,
        list: [],
        textMessage: {
            text: "",
            type: "text",
        },
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
                list: action.payload.dialogs,
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
            messages: {
                ...state.messages,
                offset: 0,
                list: [],
            }
        };
    };

    if (addDialogsListItemAction.is(action)) {
        return {
            ...state,
            dialogs: {
                ...state.dialogs,
                list: [
                    action.payload,
                    ...state.dialogs.list,
                ]
            }
        };
    }


    // messages

    if (setMessagesStatusAction.is(action)) {
        return {
            ...state,
            messages: {
                ...state.messages,
                status: action.payload,
            }
        };
    };

    if (setMessagesListAction.is(action)) {
        return {
            ...state,
            messages: {
                ...state.messages,
                list: action.payload,
            }
        };
    };

    if (setTextMessageAction.is(action)) {
        return {
            ...state,
            messages: {
                ...state.messages,
                textMessage: {
                    ...state.messages.textMessage,
                    text: action.payload,
                }
            }
        };
    };

    if (resetTextMessageAction.is(action)) {
        return {
            ...state,
            messages: {
                ...state.messages,
                textMessage: {
                    ...state.messages.textMessage,
                    text: "",
                }
            }
        };
    };

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
                        messages: [action.payload],
                    },
                ],
            },
            messages: {
                ...state.messages,
                list: [
                    action.payload,
                    ...state.messages.list,
                ]
            }
        }
    }

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