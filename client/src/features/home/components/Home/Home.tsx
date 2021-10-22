import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import Searchbar from '../Searchbar/Searchbar';
import MessageInput from '../../containers/MessageInputContainer';
import MessagesTrack from '../../containers/MessagesTrackContainer';
import MiddleColumnHeader from '../MiddleColumnHeader/MiddleColumnHeader';
import Sidebar from 'features/home/containers/SidebarContainer';
import { CustomScroll, useMediaQuery, IUser, withLoader } from 'shared';

import { setSidebarVisibilityAction, selectSidebarVisibility } from '../../store';

import style from './Home.module.scss';


type HomeProps = {
    selectedDialogMember: IUser | null;
};

const Home: React.FC<HomeProps> = (props) => {

    const { selectedDialogMember } = props;

    const dispatch = useDispatch();

    const sidebarVisibility = useSelector(selectSidebarVisibility);

    const [searchbarVisility, setSearchbarVisility] = React.useState(false);
    const [matches] = useMediaQuery("(max-width: 900px)");

    const toggleDialogsbarVisibility = React.useCallback(() => {
        dispatch(setSidebarVisibilityAction({ payload: !sidebarVisibility }));
    }, [sidebarVisibility]);
    const closeSearchbar = React.useCallback(() => setSearchbarVisility(false), []);
    const toggleSearchbarVisility = React.useCallback(() => setSearchbarVisility(!searchbarVisility), [searchbarVisility]);

    return (
        <div className={style.home_wrapper}>
            <div className="container">
                <div className={style.home_grid}>
                    <Sidebar/>
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