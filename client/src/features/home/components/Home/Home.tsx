import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import DialogsTrack from '../DialogsTrack/DialogsTrack';
import Searchbar from '../Searchbar/Searchbar';
import MessageInput from '../MessageInput/MessageInput';
import MoreActionsPopup from '../Popups/MoreActionsPopup';
import HomeMenuPopup from '../Popups/HomeMenuPopup';
import { SearchField, CustomScroll, Avatar, useMediaQuery } from 'shared';

import style from './Home.module.scss';


const StyledIconButton = withStyles({
    root: {
        '& .MuiSvgIcon-root': {
            color: 'var(--color-text-100)',
        },
    },
    sizeSmall: {
        padding: '8px',
    },
})(IconButton);

const Home: React.FC = () => {

    const [searchBarVisility, setSearchBarVisility] = React.useState(false);
    const [dialogsBarVisibility, setDialogsBarVisibility] = React.useState(true);
    const [matches] = useMediaQuery("(max-width: 900px)");

    const closeSearchBar = React.useCallback(() => setSearchBarVisility(false), []);
    const toggleSearchbarVisility = React.useCallback(() => setSearchBarVisility(!searchBarVisility), [searchBarVisility]);
    const toggleDialogsBarVisibility = () => setDialogsBarVisibility((prev) => !prev);

    return (
        <div className={style.home_wrapper}>
            <div className="container">
                <div className={style.home_grid}>
                    <aside className={classNames(
                        style.dialogs,
                        !dialogsBarVisibility && matches && style.dialogs_close,
                    )}>
                        <div className={style.dialogs_anim}>
                            <header className={style.dialogs_header}>
                                <HomeMenuPopup />
                                <div className={style.search_wrapper}>
                                    <SearchField />
                                </div>
                            </header>
                            <div className={style.dialogs_track}>
                                <CustomScroll>
                                    <DialogsTrack />
                                </CustomScroll>
                            </div>
                        </div>
                    </aside>
                    <main className={classNames(
                        style.home_main,
                        searchBarVisility && style.searchbar_open)}
                    >
                        <div className={style.middle_column}>
                            <header className={style.middle_header}>
                                <div className="user-info middle_header_info">
                                    {matches && (
                                        <div className={style.mainHeaderActionsButton} onClick={toggleDialogsBarVisibility}>
                                            <StyledIconButton size="small">
                                                {dialogsBarVisibility ? (
                                                    <CloseIcon />
                                                ) : (
                                                    <ArrowBackIcon />
                                                )}
                                            </StyledIconButton>
                                        </div>
                                    )}
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
                                            <span className="last-seen">last seen 23.06.2021</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.middle_header_actions}>
                                    <div className={style.actionsButtonWrapper} onClick={toggleSearchbarVisility}>
                                        <StyledIconButton size="small">
                                            <SearchRoundedIcon />
                                        </StyledIconButton>
                                    </div>
                                    <div className={style.actionsButtonWrapper}>
                                        <MoreActionsPopup />
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
                            <div className={style.searchbar_anim}>
                                <Searchbar
                                    handleClose={closeSearchBar}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
};

export default Home;