import React from 'react';
import Notification from 'features/notification/containers/NotificationContainer';

const withNotification = <T extends object>(Component: React.ComponentType<T>): React.FC<T> => {
    return (props) => (
        <React.Fragment>
            <Component {...props} />
            <Notification/>
        </React.Fragment>
    );
};

export default withNotification;