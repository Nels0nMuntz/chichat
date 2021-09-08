import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

import DialogsTrack from '../DialogsTrack/DialogsTrack';
import Searchbar from '../Searchbar/Searchbar';
import MessageInput from '../MessageInput/MessageInput';
import MoreActionsPopup from '../Popups/MoreActionsPopup';
import HomeMenuPopup from '../Popups/HomeMenuPopup';
import { SearchField, CustomScroll, Avatar } from 'shared';

import style from './Home.module.scss';


const useStyles = makeStyles({
    label: {
        '& .MuiSvgIcon-root path': {
            fill: 'var(--color-text-100)',
        },
    },
    sizeSmall: {
        padding: '8px',
    },
});

const Home: React.FC = () => {

    const classes = useStyles();

    const [searchbarVisility, setSearchbarVisility] = React.useState(false);

    const closeSearchbar = React.useCallback(() => setSearchbarVisility(false), []);
    const toggleSearchbarVisility = React.useCallback(() => setSearchbarVisility(!searchbarVisility), [searchbarVisility]);

    return (
        <div className={style.home_wrapper}>
            <div className="container">
                <div className={style.home_grid}>
                    <aside className={style.dialogs}>
                        <header className={style.dialogs_header}>
                            {/* <IconButton
                                size="small"
                                classes={{
                                    label: classes.label,
                                    sizeSmall: classes.sizeSmall,
                                }}
                            >
                                <MenuIcon fontSize="medium" />
                            </IconButton> */}
                            <HomeMenuPopup/>
                            <div className={style.search_wrapper}>
                                <SearchField />
                            </div>
                        </header>
                        <div className={style.dialogs_track}>
                            <CustomScroll>
                                <DialogsTrack />
                            </CustomScroll>
                        </div>
                    </aside>
                    <main className={classNames(
                        style.home_main,
                        searchbarVisility && style.searchbar_open)}
                    >
                        <div className={style.middle_column}>
                            <header className={style.middle_header}>
                                <div className="user-info middle_header_info">
                                    <div className="avatar-wrapper">
                                        <div className={`${style.avatar} avatar`}>
                                            <Avatar
                                                firstName="Александр"
                                                lastName="Блок"
                                            />
                                        </div>
                                    </div>
                                    <div className="info">
                                        <div className="title">
                                            <h3>Sonar</h3>
                                        </div>
                                        <div className={'subtitle'}>
                                            <div className="last-seen">last seen 23.06.2021</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.middle_header_actions}>
                                    <div className={style.actionsButtonWrapper} onClick={toggleSearchbarVisility}>
                                        <IconButton size="small" classes={{ sizeSmall: classes.sizeSmall }}>
                                            <SearchRoundedIcon htmlColor="var(--color-text-100)" />
                                        </IconButton>
                                    </div>
                                    <div className={style.actionsButtonWrapper}>
                                        <MoreActionsPopup/>
                                    </div>
                                </div>
                            </header>
                            <div className={style.messages_wrapper}>
                                <CustomScroll>
                                    
                                </CustomScroll>
                                <div className={style.message_input}>
                                    <MessageInput />
                                </div>
                            </div>
                        </div>
                        <div className={style.searchbar}>
                            <Searchbar
                                handleClose={closeSearchbar}
                            />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
};

export default Home;