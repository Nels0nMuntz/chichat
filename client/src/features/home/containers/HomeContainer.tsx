import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Home from '../components/Home/Home';
import { initHomeAction } from '../store/actions';
import {
    selectHomeStatus,
    selectActiveDialog,
} from '../store/selectors';


const HomeContainer: React.FC = () => {

    const dispatch = useDispatch();

    const homeStatus = useSelector(selectHomeStatus);
    const selectedDialog = useSelector(selectActiveDialog);

    React.useEffect(() => {
        dispatch(initHomeAction({}));
    }, []);

    return (
        <Home
            status={homeStatus}
            selectedDialogMember={selectedDialog?.member || null}
        />
    )
};

export default HomeContainer;