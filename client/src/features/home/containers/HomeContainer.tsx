import React from 'react';
import { useDispatch } from 'react-redux';

import Home from '../components/Home/Home';
import { fetchDialogsAction } from '../store/actions';


const HomeContainer : React.FC = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchDialogsAction({}));
    }, []);

    return (
        <Home/>
    )
};

export default HomeContainer;