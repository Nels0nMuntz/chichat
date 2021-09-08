import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { localStorageService } from '../../../services';
import { SIGNIN_PAGE_URL } from 'features/auth/urls';


type PrivateRouteProps = {
    component: React.FC<RouteComponentProps>
    path: string
    exact: boolean
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {

    const isAuth = localStorageService.hasAccessToken();

    return (
        <Route
            { ...rest }
            render={(props) => isAuth ? <Component { ...props }/> : <Redirect to={SIGNIN_PAGE_URL.urlTemplate} /> }
        />
    );
};

export default PrivateRoute;