import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import classNames from 'classnames';

import Searchbar from '../Searchbar/Searchbar';
import MessageInput from '../../containers/MessageInputContainer';
import MessagesTrack from '../../containers/MessagesTrackContainer';
import MiddleColumnHeader from '../MiddleColumnHeader/MiddleColumnHeader';
import { SidebarContainer as Sidebar} from 'features/home/containers/SidebarContainer';
import { IDialog } from 'features/home/models';
import { withLoader } from 'shared';

import style from './Home.module.scss';


type HomeProps = {
    activeDialog: IDialog | undefined;
    matches: boolean
    searchbarVisility: boolean;
    sidebarVisibility: boolean;
    closeSearchbar: () => void;
    toggleDialogsbarVisibility: () => void;
    toggleSearchbarVisility: () => void;
    handleClickAway: (event: any) => void;
};

const Home: React.FC<HomeProps> = (props) => {

    const {
        activeDialog,
        matches,
        searchbarVisility,
        sidebarVisibility,
        closeSearchbar,
        toggleDialogsbarVisibility,
        toggleSearchbarVisility,
        handleClickAway,
    } = props;
    
    const messageTrackRef = React.useRef<HTMLDivElement>(null);
    
    const [messageTrackEl, setMessageTrackEl] = React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => setMessageTrackEl(messageTrackRef.current), []);

    return (

        <div className={style.home_wrapper}>
            <div className="container">
                <div className={style.home_grid}>
                    <Sidebar />
                    <main className={classNames(
                        style.home_main,
                        searchbarVisility && style.searchbar_open)}
                    >
                        <div className={style.middle_column}>
                            <MiddleColumnHeader
                                member={activeDialog?.member || null}
                                matches={matches}
                                sidebarVisibility={sidebarVisibility}
                                toggleSearchbarVisility={toggleSearchbarVisility}
                                toggleDialogsbarVisibility={toggleDialogsbarVisibility}
                            />
                            <div className={style.messages_wrapper}>
                                <ClickAwayListener onClickAway={handleClickAway}>
                                    <div className={style.messages_track} ref={messageTrackRef}>
                                        {activeDialog && (
                                            <MessagesTrack 
                                                activeDialog={activeDialog}
                                                containerEl={messageTrackEl}
                                            />
                                        )}
                                    </div>
                                </ClickAwayListener>
                                <MessageInput />
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

export default Home;