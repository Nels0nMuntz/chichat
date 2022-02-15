import React from 'react';
import { SnackbarProvider as Snackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import { ChildrenProps } from 'shared';


const TransitionLeft = (props: TransitionProps) => {
    return (
        <Slide {...props} direction="left" />
    );
};

const SnackbarProvider: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            TransitionComponent={TransitionLeft}
            maxSnack={Infinity}
        >
            {children}
        </Snackbar>
    );
};

export default SnackbarProvider;