import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Home from '../components/Home/Home';
import { initHomeAction } from '../store';
import {
    selectHomeStatus,
    selectActiveDialog,
} from '../store';


const HomeContainer: React.FC = () => {

    const dispatch = useDispatch();

    const homeStatus = useSelector(selectHomeStatus);
    const activeDialog = useSelector(selectActiveDialog);

    React.useEffect(() => {
        dispatch(initHomeAction({}));
    }, []);

    return (
        <Home
            status={homeStatus}
            selectedDialogMember={activeDialog?.member || null}
        />
    )
};

export default HomeContainer;