import React from 'react';

import SearchTabs from '../SearchTabs/SearchTabs';
import SearchTabPanel from '../SearchTabsPanel/SearchTabPanel';
import SearchTabPanelGroup from '../SearchTabPanelGroup/SearchTabPanelGroup';
import {
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemInfo,
    ListItemTitle,
    ListItemSubtitle,
    SearchGroups,
    IUser,
    getUserFullname,
} from 'shared';

import style from './SearchTrack.module.scss';


const tabs = Object.values(SearchGroups);

type SearchTrackProps = {
    activeTab: SearchGroups;
    globalSearch: boolean;
    users: Array<IUser>;
    handleChangeActiveTab: (tab: SearchGroups) => void;
    handleToggleGlobalSearch: () => void;
    handleSelectUser: (userId: string) => void;
};

const SearchTrack: React.FC<SearchTrackProps> = React.memo((props) => {

    const {
        activeTab,
        globalSearch,
        users,
        handleChangeActiveTab,
        handleToggleGlobalSearch,
        handleSelectUser,
    } = props;

    const active = tabs.indexOf(activeTab);

    const handleChange = React.useCallback((_: React.ChangeEvent<{}>, value: number) => {
        handleChangeActiveTab(tabs[value]);
    }, []);

    const renderUsers = React.useMemo(() => (
        users.map(user => (
            <ListItem 
                key={user.userId}
                onClick={() => handleSelectUser(user.userId)}
            >
                <ListItemIcon>
                    <Avatar user={user} />
                </ListItemIcon>
                <ListItemInfo>
                    <ListItemTitle>{getUserFullname(user)}</ListItemTitle>
                    <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                </ListItemInfo>
            </ListItem>
        ))
    ), [users]);

    return (
        <div className={style.container}>
            <SearchTabs
                tabs={tabs}
                active={active}
                handleChange={handleChange}
            />
            <SearchTabPanel
                activeTab={active}
                index={0}
            >
                <SearchTabPanelGroup
                    label="Chats and Contacts"
                    suffix={(
                        <ToggleSearchButton
                            label={globalSearch ? "Search in chats" : "Global search"}
                            handleClick={handleToggleGlobalSearch}
                        />
                    )}
                >
                    {renderUsers}
                </SearchTabPanelGroup>
            </SearchTabPanel>
        </div>
    )
});

export default SearchTrack;

const ToggleSearchButton: React.FC<{
    label: string;
    handleClick: () => void;
}> = ({ label, handleClick }) => {

    return (
        <button
            onClick={handleClick}
            className={style.toggleSearchButton}
            style={{
                fontWeight: 400,
                flexShrink: 0,
                maxWidth: '50%',
                color: 'var(--color-primary)',
            }}
        >
            {label}
        </button>
    )
}