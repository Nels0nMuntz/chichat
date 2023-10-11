import React from 'react';
import classNames from 'classnames';

import HomeMenuPopup from '../Popups/HomeMenuPopup';
import SidebarSearchField from '../SidebarSearchField/SidebarSearchField';
import SearchTrack from '../SearchTrack/SearchTrack';
import DialogsTrack from '../../containers/DialogsTrackContainer';
import { Status, SearchGroups, IUser } from 'shared';

import style from './Sidebar.module.scss';
import DialogsView from "./components/DialogsView";
import EditProfileView from './components/EditProfileView';

type SidebarProps = {
    status: Status;
    matches: boolean;
    visibility: boolean;
    searchMode: boolean;
    searchFieldValue: string;
    searchFieldTyping: boolean;
    activeTab: SearchGroups;
    globalSearch: boolean;
    users: Array<IUser>;
    profileEditMode: boolean;
    disableSearchMode: () => void;
    enableSearchMode: () => void;
    handleSearch: (value: string) => void;
    handleChange: (value: string) => void;
    handleTyping: (value: boolean) => void;
    handleChangeActiveTab: (tab: SearchGroups) => void;
    handleToggleGlobalSearch: () => void;
    resetSearch: () => void;
    handleSelectUser: (userId: string) => void;
};

const Sidebar: React.FC<SidebarProps> = (props) => {
    const {
        status,
        matches,
        visibility,
        searchMode,
        searchFieldValue,
        searchFieldTyping,
        activeTab,
        globalSearch,
        users,
        profileEditMode,
        disableSearchMode,
        enableSearchMode,
        handleSearch,
        handleChange,
        handleTyping,
        handleChangeActiveTab,
        handleToggleGlobalSearch,
        resetSearch,
        handleSelectUser,
    } = props;

    return (
        <aside
            className={classNames(
                style.sidebar,
                !visibility && matches && style.sidebar_close
            )}
        >
            <div className={style.sidebar_anim}>
                {profileEditMode ? (
                    <EditProfileView />
                ) : (
                    <DialogsView
                        status={status}
                        searchMode={searchMode}
                        searchFieldValue={searchFieldValue}
                        searchFieldTyping={searchFieldTyping}
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
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
