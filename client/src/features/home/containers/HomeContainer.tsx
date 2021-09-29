import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Home from '../components/Home/Home';
import { fetchAllDialogsAction } from '../store/actions';
import { selectActiveDialog } from '../store/selectors';


const HomeContainer: React.FC = () => {

    const dispatch = useDispatch();

    const selectedDialog = useSelector(selectActiveDialog);

    React.useEffect(() => {
        dispatch(fetchAllDialogsAction({}));
    }, []);

    return (
        <Home
            selectedDialogMember={selectedDialog?.member || null}
        />
    )
};

export default HomeContainer;