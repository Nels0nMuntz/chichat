import React from 'react';
import { withStyles } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import style from './SearchTabs.module.scss';


const StyledTabs = withStyles({
    root: {
        minHeight: '42px',
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
        },
        '& .MuiTabs-indicatorSpan': {
            maxWidth: '65%',
            width: '100%',
            backgroundColor: 'var(--color-primary)',
        },
    },
})(Tabs);

const StyledTab = withStyles({
    root: {
        fontSize: '14px',
        minHeight: '42px',
        textTransform: 'capitalize',
        minWidth: 'unset',
        flex: '1 1 auto',
        color: 'var(--color-text-100)',
    },
    selected: {
        color: 'var(--color-primary)',
    }
})(Tab);

type SearchTabsProps = {
    active: number;
    handleChange: (e: React.ChangeEvent<{}>, newValue: number) => void
};

const SearchTabs: React.FC<SearchTabsProps> = ({ active, handleChange }) => {

    return (
        <div className={style.search_tabs_wrapper}>
            <StyledTabs
                value={active}
                onChange={handleChange}
                TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
                variant="scrollable"
                scrollButtons="off"
            >
                <StyledTab label="Chats" />
                <StyledTab label="Media" />
                <StyledTab label="Links" />
                <StyledTab label="Files" />
                <StyledTab label="Music" />
                <StyledTab label="Voice" />
            </StyledTabs>
        </div>
    )
};

export default SearchTabs;