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
} from 'shared';

import style from './GlobalSearch.module.scss';


// const tabPanels = ["Tab Panel 1", "Tab Panel 2", "Tab Panel 3"];

const GlobalSearch: React.FC = React.memo(() => {

    const [activeTab, setActiveTab] = React.useState(0);

    const handleChange = React.useCallback((_: React.ChangeEvent<{}>, newValue: number) => {
        setActiveTab(newValue);
    }, []);

    return (
        <div className={style.container}>
            <SearchTabs
                active={activeTab}
                handleChange={handleChange}
            />
            <SearchTabPanel
                activeTab={activeTab}
                index={0}
            >
                <SearchTabPanelGroup
                    label="Chats and Contacts"
                    suffix="Global search"
                >
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                </SearchTabPanelGroup>
                <SearchTabPanelGroup
                    label="Chats and Contacts"
                    suffix="Global search"
                >
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                </SearchTabPanelGroup>
                <SearchTabPanelGroup
                    label="Chats and Contacts"
                    suffix="Global search"
                >
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                firstName="Александр"
                                lastName="Блок"
                                size="large"
                            />
                        </ListItemIcon>
                        <ListItemInfo>
                            <ListItemTitle>Sonar Sonar</ListItemTitle>
                            <ListItemSubtitle>Last seen 12 minutes ago</ListItemSubtitle>
                        </ListItemInfo>
                    </ListItem>
                </SearchTabPanelGroup>
            </SearchTabPanel>
        </div>
    )
});

export default GlobalSearch;