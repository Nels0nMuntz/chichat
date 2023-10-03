import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Sidebar from '../components/Sidebar/Sidebar';

import {
    selectSidebarVisibility,
    selectSidebarSearchField,
    selectSidebarStatus,
    selectActiveTab,
    selectSearchUsers,
    selectDialogsList,
    selectSearchMode,
    setSidebarSearchFieldValueAction,
    sidebarSearchAction,
    setSidebarSearchFieldTypingAction,
    setActiveSearchTabAction,
    resetSidebarSearchAction,
    setActiveDialogAction,
    setSidebarSearchModeAction,
    createDialogAction,
    selectUserId,
} from '../store'
import { useMediaQuery, SearchGroups, isEmptyString } from 'shared';


export const SidebarContainer: React.FC = React.memo(() => {

    const dispatch = useDispatch();

    const [matches] = useMediaQuery("(max-width: 900px)");
    const [globalSearch, setGlobalSearch] = React.useState(true);

    const status = useSelector(selectSidebarStatus);
    const hostUserId = useSelector(selectUserId);
    const searchMode = useSelector(selectSearchMode);
    const visibility = useSelector(selectSidebarVisibility);
    const { value, typing } = useSelector(selectSidebarSearchField);
    const activeTab = useSelector(selectActiveTab);
    const dialogs = useSelector(selectDialogsList);
    const users = useSelector(selectSearchUsers);

    const enableSearchMode = React.useCallback(() => { dispatch(setSidebarSearchModeAction({ payload: true })) }, []);
    const disableSearchMode = React.useCallback(() => { dispatch(setSidebarSearchModeAction({ payload: false })) }, []);
    const handleSearch = React.useCallback((value: string) => {
        if (isEmptyString(value)) {
            dispatch(resetSidebarSearchAction({ payload: null }));
            return;
        };
        dispatch(sidebarSearchAction({
            payload: {
                query: value,
                group: activeTab,
                internal: !globalSearch,
            }
        }));
    }, [activeTab, globalSearch]);
    const resetSearch = React.useCallback(() => { dispatch(resetSidebarSearchAction({ payload: null })) }, []);
    const handleChange = (value: string) => { dispatch(setSidebarSearchFieldValueAction({ payload: value })) };
    const handleTyping = React.useCallback((value: boolean) => { dispatch(setSidebarSearchFieldTypingAction({ payload: value })) }, []);
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.code === "Escape") {
            disableSearchMode();
        }
    };
    const handleChangeActiveTab = React.useCallback((tab: SearchGroups) => { dispatch(setActiveSearchTabAction({ payload: tab })) }, []);
    const handleToggleGlobalSearch = React.useCallback(() => setGlobalSearch(prev => !prev), []);
    const handleSelectUser = React.useCallback((userId: string) => {
        const dialog = dialogs.find(({ member }) => member.userId === userId);
        if (dialog) {
            dispatch(resetSidebarSearchAction({ payload: null }));
            dispatch(setActiveDialogAction({ payload: dialog.dialogId }));
            disableSearchMode();
        } else {
            dispatch(createDialogAction({ payload: {
                member_1: hostUserId,
                member_2: userId,
            } }));
        }
    }, [dialogs, hostUserId]);

    React.useEffect(() => {
        if (searchMode) {
            window.document.body.addEventListener("keydown", handleKeydown);
        }
        return () => {
            window.document.body.removeEventListener("keydown", handleKeydown);
        }
    }, [searchMode]);

    return (
        <Sidebar
            matches={matches}
            status={status}
            visibility={visibility}
            searchMode={searchMode}
            searchFieldValue={value}
            searchFieldTyping={typing}
            activeTab={activeTab}
            globalSearch={globalSearch}
            users={users}
            enableSearchMode={enableSearchMode}
            disableSearchMode={disableSearchMode}
            handleSearch={handleSearch}
            handleChange={handleChange}
            handleTyping={handleTyping}
            handleChangeActiveTab={handleChangeActiveTab}
            handleToggleGlobalSearch={handleToggleGlobalSearch}
            resetSearch={resetSearch}
            handleSelectUser={handleSelectUser}
        />
    );
});