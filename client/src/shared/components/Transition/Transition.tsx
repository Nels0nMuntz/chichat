import React from 'react';
import Popover, { PopoverOrigin  } from '@material-ui/core/Popover';


type TransitionProps = {
    open: boolean
    children: React.ReactChild
    anchorOrigin?: PopoverOrigin
    transformOrigin?: PopoverOrigin
    anchorEl?: Element | ((element: Element) => Element) | null
    handleClose: () => void
};

const Transition: React.FC<TransitionProps> = ({ open, children, anchorEl, anchorOrigin, transformOrigin, handleClose }) => {

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            onClose={handleClose}            
        >
            {children}
        </Popover>
    )
};

export default Transition;