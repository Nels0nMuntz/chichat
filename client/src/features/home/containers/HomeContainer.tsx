import React from 'react';

import Home from '../components/Home/Home';
import { axiosInstance } from 'core';


const HomeContainer : React.FC = () => {

    React.useEffect(() => {
        axiosInstance.get("http://localhost:3000/api/auth/users")
            .then(res => console.log(res))
    }, []);

    return (
        <Home/>
    )
};

export default HomeContainer;