import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import { AlertStatus } from '../models';


const mapMessage = (message: string | string[]) => {
    if(typeof message === 'string') return message;
    return message.map((msg, i) => (
        <p key={i} >{msg}</p>
    ))
};

const TransitionLeft = (props: TransitionProps) => {
    return (
        <Slide {...props} direction="left" />
    );
};

type NotificationProps = {
    status: AlertStatus
    isOpen: boolean
    message: string | string[]
    handleClose: () => void
};

const Notification : React.FC<NotificationProps> = React.memo(({ status, isOpen, message, handleClose }) => {
    return (
        <Snackbar
            open={isOpen}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            TransitionComponent={TransitionLeft}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert severity={status}>
                {mapMessage(message)}
            </Alert>
        </Snackbar>
    )
});

export default Notification;