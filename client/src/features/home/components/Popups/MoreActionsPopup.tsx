import React from 'react';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Notifications from '@material-ui/icons/NotificationsOffOutlined';
import CheckCircle from '@material-ui/icons/CheckCircleOutlineOutlined';
import Delete from '@material-ui/icons/DeleteOutlineOutlined';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import ListItemText from '@material-ui/core/ListItemText';

import { Popover, PopupMenu } from 'shared';

import style from './Popups.module.scss';


const StyledIconButton = withStyles({
    sizeSmall: {
        padding: '8px',
    },
})(IconButton);
const StyledListItemText = withStyles({
    root: {
        color: 'var(--color-error) !important',
    },
})(ListItemText);

const MoreActionsPopup: React.FC = React.memo(() => {

    const сontainer = React.useRef<HTMLDivElement>(null);

    const [open, setOpen] = React.useState(false);
    const [сontainerRef, setСontainerRef] = React.useState<HTMLDivElement | null>(null);

    const handleOpen = React.useCallback(() => setOpen(true), []);
    const handleClose = React.useCallback(() => setOpen(false), []);

    React.useEffect(() => setСontainerRef(сontainer.current), []);

    return (
        <React.Fragment>
            <Popover
                open={open}
                component={
                    <PopupMenu
                        menu={[
                            { icon: <Notifications />, title: 'Mute' },
                            { icon: <CheckCircle />, title: 'Select messages' },
                            { icon: <Delete />, title: <StyledListItemText>Delete chat</StyledListItemText> },
                        ]}
                        onClick={handleClose}
                        onClose={handleClose}
                    />
                }
                placement="top-end"
                transformOrigin="100% 0"
                container={сontainerRef}
                onOpen={handleOpen}
                onClose={handleClose}
            >
                <button className={style.input_action}>
                    <StyledIconButton size="small">
                        <MoreVertRoundedIcon htmlColor="var(--color-text-100)" />
                    </StyledIconButton>
                </button>
            </Popover>
            <div className={`${style.home_popover_container}`} ref={сontainer}></div>
        </React.Fragment>
    );
});

export default MoreActionsPopup;