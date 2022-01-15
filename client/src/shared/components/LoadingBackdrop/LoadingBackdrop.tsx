import * as React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


type LoadingBackdropProps = {
    open: boolean;
};

const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({ open }) => {
    return (
        <Backdrop
            open={open}
            style={{ zIndex: 10, color: '#fff' }}
        >
            <CircularProgress color='inherit' />
        </Backdrop>
    )
};

export default LoadingBackdrop;