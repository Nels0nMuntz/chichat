import React from 'react';
import { withNotification } from 'shared';

import HomeContainer from '../containers/HomeContainer';


const HomePage: React.FC = () => {
    return (
        <HomeContainer />
    )
};

export default withNotification(HomePage);