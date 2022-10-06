import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Home from '../components/Home/Home';
import { initHomeAction } from '../store';
import {
    selectHomeStatus,
    selectActiveDialog,
    selectSidebarVisibility,
    setSidebarVisibilityAction,
    changeSelectModeAction,
} from '../store';
import { Status, useMediaQuery, Loader } from 'shared';


const HomeContainer: React.FC = () => {

    const dispatch = useDispatch();

    const homeStatus = useSelector(selectHomeStatus);
    const activeDialog = useSelector(selectActiveDialog);
    const sidebarVisibility = useSelector(selectSidebarVisibility);
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

    React.useEffect(() => {
        dispatch(initHomeAction({}));
    }, []);

    if(homeStatus === (Status.Initial || Status.Running)) {
        return <Loader/>;
    };

    return (
        <Home
            activeDialog={activeDialog}
            matches={matches}
            searchbarVisility={searchbarVisility}
            sidebarVisibility={sidebarVisibility}
            closeSearchbar={closeSearchbar}
            toggleDialogsbarVisibility={toggleDialogsbarVisibility}
            toggleSearchbarVisility={toggleSearchbarVisility}
            handleClickAway={handleClickAway}
        />
    )
};

export default HomeContainer;