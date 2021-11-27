import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import Searchbar from '../Searchbar/Searchbar';
import MessageInput from '../../containers/MessageInputContainer';
import MessagesTrack from '../../containers/MessagesTrackContainer';
import MiddleColumnHeader from '../MiddleColumnHeader/MiddleColumnHeader';
import { SidebarContainer as Sidebar} from 'features/home/containers/SidebarContainer';
import { useMediaQuery, IUser, withLoader } from 'shared';

import { 
    setSidebarVisibilityAction, 
    selectSidebarVisibility, 
    selectActiveDialog,
    changeSelectModeAction,
} from '../../store';

import style from './Home.module.scss';


type HomeProps = {
    selectedDialogMember: IUser | null;
};

const Home: React.FC<HomeProps> = (props) => {

    const { selectedDialogMember } = props;

    const dispatch = useDispatch();

    const sidebarVisibility = useSelector(selectSidebarVisibility);
    const activeDialog = useSelector(selectActiveDialog);
    const selectMode = activeDialog?.messages.selectMode;

    const [searchbarVisility, setSearchbarVisility] = React.useState(false);
    const [matches] = useMediaQuery("(max-width: 900px)");

    const toggleDialogsbarVisibility = React.useCallback(() => {
        dispatch(setSidebarVisibilityAction({ payload: !sidebarVisibility }));
    }, [sidebarVisibility]);
    const closeSearchbar = React.useCallback(() => setSearchbarVisility(false), []);
    const toggleSearchbarVisility = React.useCallback(() => setSearchbarVisility(!searchbarVisility), [searchbarVisility]);
    const handleClickAway = React.useCallback((event: any) => {        
        if(selectMode){
            if(event.target.closest(".ignore-messages-track-click-away-listener")) return;
            dispatch(changeSelectModeAction({ payload: false }));
        };
    }, [selectMode])

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
                                member={selectedDialogMember}
                                matches={matches}
                                sidebarVisibility={sidebarVisibility}
                                toggleSearchbarVisility={toggleSearchbarVisility}
                                toggleDialogsbarVisibility={toggleDialogsbarVisibility}
                            />
                            <div className={style.messages_wrapper}>
                                <ClickAwayListener onClickAway={handleClickAway}>
                                    <div id="messages-track" className={style.messages_track}>
                                        {activeDialog && <MessagesTrack />}
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

export default withLoader(Home);