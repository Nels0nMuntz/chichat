import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { localStorageService } from 'services';
import { HOME_PAGE_URL } from 'features/home/urls';


type PublicRouteProps = {
    component: React.FC<RouteComponentProps>
    path: string
    exact: boolean
};

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, ...rest }) => {

    const isAuth = localStorageService.hasAccessToken();

    return (
        <Route
            {...rest}
            render={(props) => isAuth ? <Redirect to={HOME_PAGE_URL.urlTemplate} /> : <Component {...props} />}
        />
    );
};

export default PublicRoute;