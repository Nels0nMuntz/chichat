import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Notification from '../components/Notification';
import { AlertStatus } from '../models';
import { selectNotificationState, dropNotification } from '../store';


const NotificationContainer : React.FC = () => {

    const dispatch = useDispatch();

    const { isOpen, message, status } = useSelector(selectNotificationState);

    const alertStatus: AlertStatus = status === 'success' ? 'success' : status === 'error' ? 'error' : 'info';

    const handleClose = React.useCallback(() => { dispatch(dropNotification({})) }, []);

    return (
        <Notification
            status={alertStatus}
            isOpen={isOpen}
            message={message}
            handleClose={handleClose}
        />
    );
};

export default NotificationContainer;