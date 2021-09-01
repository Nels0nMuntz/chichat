import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { localStorageService } from '../../../services';



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
            render={(props) => isAuth ? <Component { ...props }/> : <Redirect to="/login" /> }
        />
    );
};

export default PrivateRoute;