import React from 'react';
import classNames from 'classnames';

import DialogsTrack from '../../containers/DialogsTrackContainer';
import Searchbar from '../Searchbar/Searchbar';
import MessageInput from '../../containers/MessageInputContainer';
import HomeMenuPopup from '../Popups/HomeMenuPopup';
import SidebarSearchField from '../SidebarSearchField/SidebarSearchField';
import GlobalSearch from '../GlobalSearch/GlobalSearch';
import MessagesTrack from '../../containers/MessagesTrackContainer';
import MiddleColumnHeader from '../MiddleColumnHeader/MiddleColumnHeader';
import { CustomScroll, useMediaQuery, IUser, withLoader } from 'shared';

import style from './Home.module.scss';


type HomeProps = {
    selectedDialogMember: IUser | null;
};

const Home: React.FC<HomeProps> = (props) => {

    const { selectedDialogMember } = props;

    const [searchbarVisility, setSearchbarVisility] = React.useState(false);
    const [sidebarVisibility, setSidebarVisibility] = React.useState(true);
    const [searchMode, setSearchMode] = React.useState(false);
    const [matches] = useMediaQuery("(max-width: 900px)");

    const closeSearchbar = React.useCallback(() => setSearchbarVisility(false), []);
    const toggleSearchbarVisility = React.useCallback(() => setSearchbarVisility(!searchbarVisility), [searchbarVisility]);
    const toggleDialogsbarVisibility = React.useCallback(() => setSidebarVisibility((prev) => !prev), []);
    const enableSearchMode = React.useCallback(() => setSearchMode(true), []);
    const disableSearchMode = React.useCallback(() => setSearchMode(false), []);
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.code === "Escape") setSearchMode(false);
    };

    React.useEffect(() => {
        if (searchMode) {
            window.document.body.addEventListener("keydown", handleKeydown);
        }
        return () => {
            window.document.body.removeEventListener("keydown", handleKeydown);
        }
    }, [searchMode]);

    return (
        <div className={style.home_wrapper}>
            <div className="container">
                <div className={style.home_grid}>
                    <aside className={classNames(
                        style.sidebar,
                        !sidebarVisibility && matches && style.sidebar_close,
                    )}>
                        <div className={style.sidebar_anim}>
                            <header className={style.sidebar_header}>
                                <HomeMenuPopup
                                    searchMode={searchMode}
                                    handleDisableSearchMode={disableSearchMode}
                                />
                                <div className={style.search_wrapper}>
                                    <SidebarSearchField
                                        searchMode={searchMode}
                                        enableSearchMode={enableSearchMode}
                                    />
                                </div>
                            </header>
                            <div className={style.sidebar_track}>
                                {searchMode ? (
                                    <GlobalSearch />
                                ) : (
                                    <DialogsTrack />
                                )}
                            </div>
                        </div>
                    </aside>
                    <main className={classNames(
                        style.home_main,
                        searchbarVisility && style.searchbar_open)}
                    >
                        <div className={style.middle_column}>
                            <MiddleColumnHeader
                                member={selectedDialogMember}
                                matches={matches}
                                sidebarVisibility={sidebarVisibility}
                                toggleSearchbarVisility={toggleSearchbarVisility}
                                toggleDialogsbarVisibility={toggleDialogsbarVisibility}
                            />
                            <div className={style.messages_wrapper}>
                                <div className={style.messages_track}>
                                    <CustomScroll>
                                        <MessagesTrack />
                                    </CustomScroll>
                                </div>
                                <div className={style.message_input}>
                                    <MessageInput />
                                </div>
                            </div>
                        </div>
                        <div className={style.searchbar}>
                            <div className={style.searchbar_anim}>
                                <Searchbar
                                    handleClose={closeSearchbar}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
};

export default withLoader(Home);