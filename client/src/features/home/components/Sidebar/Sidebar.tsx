import React from 'react';
import classNames from 'classnames';

import HomeMenuPopup from '../Popups/HomeMenuPopup';
import SidebarSearchField from '../SidebarSearchField/SidebarSearchField';
import SearchTrack from '../SearchTrack/SearchTrack';
import DialogsTrack from '../../containers/DialogsTrackContainer';
import { Status, SearchGroups, IUser } from 'shared';

import style from './Sidebar.module.scss';


type SidebarProps = {
    status: Status;
    matches: boolean;
    visibility: boolean;
    searchMode: boolean;
    searchFieldValue: string;
    searchFieldTyping: boolean;
    activeTab: SearchGroups;
    globalSearch: boolean;
    users: Array<IUser>
    disableSearchMode: () => void;
    enableSearchMode: () => void;
    handleSearch: (value: string) => void;
    handleChange: (value: string) => void;
    handleTyping: (value: boolean) => void;
    handleChangeActiveTab: (tab: SearchGroups) => void;
    handleToggleGlobalSearch: () => void;
    resetSearch: () => void;
    handleSelectUser: (userId: string) => void
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
        <aside className={classNames(
            style.sidebar,
            !visibility && matches && style.sidebar_close,
        )}>
            <div className={style.sidebar_anim}>
                <header className={style.sidebar_header}>
                    <HomeMenuPopup
                        searchMode={searchMode}
                        handleDisableSearchMode={disableSearchMode}
                    />
                    <div className={style.search_wrapper}>
                        <SidebarSearchField
                            value={searchFieldValue}
                            typing={searchFieldTyping}
                            loading={status === Status.Running}
                            searchMode={searchMode}
                            enableSearchMode={enableSearchMode}
                            handleSearch={handleSearch}
                            handleChange={handleChange}
                            handleTyping={handleTyping}
                            resetSearch={resetSearch}
                        />
                    </div>
                </header>
                <div className={style.sidebar_track}>
                    {searchMode ? (
                        <SearchTrack
                            activeTab={activeTab}
                            globalSearch={globalSearch}
                            users={users}
                            handleChangeActiveTab={handleChangeActiveTab}
                            handleToggleGlobalSearch={handleToggleGlobalSearch}
                            handleSelectUser={handleSelectUser}
                        />
                    ) : (
                        <DialogsTrack />
                    )}
                </div>
            </div>
        </aside>
    )
};

export default Sidebar;