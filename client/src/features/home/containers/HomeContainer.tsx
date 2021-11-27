import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Home from '../components/Home/Home';
import { initHomeAction } from '../store';
import {
    selectHomeStatus,
    selectActiveDialogId,
    selectDialogsList,
} from '../store';


const HomeContainer: React.FC = () => {

    const dispatch = useDispatch();

    const homeStatus = useSelector(selectHomeStatus);
    const dialogs = useSelector(selectDialogsList);
    const activeDialogId = useSelector(selectActiveDialogId);

    const activeDialog = dialogs.find(dialog => dialog.dialogId === activeDialogId);
    const activeDialogMember = activeDialog?.member;

    React.useEffect(() => {
        dispatch(initHomeAction({}));
    }, []);

    return (
        <Home
            status={homeStatus}
            selectedDialogMember={activeDialogMember || null}
        />
    )
};

export default HomeContainer;