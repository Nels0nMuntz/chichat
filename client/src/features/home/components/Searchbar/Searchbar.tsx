import React from 'react';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { CustomScroll } from 'shared';
import SearchbarMessagesTrack from '../SearchbarMessagesTrack/SearchbarMessagesTrack';

import style from './Searchbar.module.scss';


const useStyles = makeStyles({
    root: {
        padding: '8px',
    }
});

type SearchbarProps = {
    handleClose: () => void
};

const Searchbar: React.FC<SearchbarProps> = ({ handleClose }) => {

    const classes = useStyles();    

    return (
        <div className={style.searchbar}>
            <div className={style.header}>
                <div className={style.headerItem}>
                    <IconButton className={classes.root} onClick={handleClose}>
                        <CloseIcon htmlColor="var(--color-text-100)" />
                    </IconButton>
                </div>
                <div className={style.headerItem}>
                    {/* <SearchField/> */}
                </div>
                <div className={style.headerItem}>
                    <IconButton className={classes.root}>
                        <CalendarTodayIcon htmlColor="var(--color-text-100)" />
                    </IconButton>
                </div>
            </div>
            <div className={style.messages_track}>
                <CustomScroll>
                    <p className={style.helper_text}>Search for messages</p>
                    <SearchbarMessagesTrack/>
                </CustomScroll>
            </div>
        </div>
    )
};

export default Searchbar;