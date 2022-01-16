import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper, { PopperPlacementType } from '@material-ui/core/Popper';


const useSatyles = makeStyles({
    paper: {
        borderRadius: 'var(--border-radius)',
        backgroundColor: 'var(--color-bg)',
    },
});

type PopoverProps = {
    component: JSX.Element
    children: React.ReactChild
    open: boolean
    hover?: boolean
    container?: React.ReactInstance | (() => React.ReactInstance | null) | null
    placement?: PopperPlacementType
    transformOrigin?: string
    onOpen: () => void
    onClose: () => void
};

const Popover: React.FC<PopoverProps> = ({
    component,
    children,
    open,
    hover,
    container,
    placement,
    transformOrigin,
    onOpen,
    onClose
}) => {

    const classes = useSatyles();

    const anchorRef = React.useRef<HTMLDivElement>(null);

    return (
        <div>
            <div
                ref={anchorRef}
                onClick={hover ? undefined : onOpen}
                onMouseEnter={hover ? onOpen : undefined}
            >
                {children}
            </div>
            {anchorRef.current && (
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement={placement}
                    transition
                    container={container}
                >
                    {({ TransitionProps }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: `${transformOrigin}` }}
                        >
                            <Paper className={classes.paper} elevation={3}>
                                <ClickAwayListener onClickAway={onClose}>
                                    <div onMouseLeave={hover ? onClose : undefined}>
                                        {component}
                                    </div>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            )}
        </div>
    );
}

export default Popover;