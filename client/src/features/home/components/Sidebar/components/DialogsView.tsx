import React from 'react'

import { Status, SearchGroups, IUser } from 'shared';
import HomeMenuPopup from '../../Popups/HomeMenuPopup';
import SearchTrack from '../../SearchTrack/SearchTrack';
import SidebarSearchField from '../../SidebarSearchField/SidebarSearchField';
import DialogsTrack from '../../../containers/DialogsTrackContainer';

import style from '../Sidebar.module.scss';

type DialogsViewProps = {
  status: Status;
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

const DialogsView: React.FC<DialogsViewProps> = (props) => {

  const {
    status,
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
    <>
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
    </>
  )
}

export default DialogsView