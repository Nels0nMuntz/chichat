import React from 'react';
import { withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ThemeSwitch from '../Switch/Switch';
import { Popover, PopupMenu, ThemeContext } from 'shared';

import style from './Popups.module.scss';


const StyledIconButton = withStyles({
    sizeSmall: {
        padding: '8px',
    },
})(IconButton);

const StyledListItem = withStyles({
    root: {
        cursor: 'pointer',
        paddingTop: '12px',
        paddingBottom: '12px',
        minWidth: '260px',
        '&:hover': {
            backgroundColor: 'var(--color-bg-200)',
        },
        '& .MuiListItemText-root': {
            color: 'var(--color-text)',
        },
        '& .MuiListItemIcon-root': {
            color: 'var(--color-text-100)',
        },
    }
})(ListItem);

const HomeMenuPopup: React.FC = React.memo(() => {

    const сontainer = React.useRef<HTMLDivElement>(null);

    const [open, setOpen] = React.useState(false);
    const [сontainerRef, setСontainerRef] = React.useState<HTMLDivElement | null>(null);

    const { switchTheme } = React.useContext(ThemeContext);

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
                            { icon: <TurnedInNotIcon />, title: 'Saved Messages' },
                            { icon: <ArchiveOutlinedIcon />, title: 'Archived Chats' },
                            { icon: <PersonOutlineOutlinedIcon />, title: 'Contacts' },
                            { icon: <SettingsOutlinedIcon />, title: 'Settings' },
                            <StyledListItem button={true} onClick={switchTheme}>
                                <ListItemIcon>
                                    <NightsStayIcon />
                                </ListItemIcon>
                                <ListItemText>Night Mode</ListItemText>
                                <ThemeSwitch/>
                            </StyledListItem>,
                            { icon: <HelpOutlineOutlinedIcon />, title: 'ChiChat Features' },
                            { icon: <BugReportOutlinedIcon />, title: 'Report Bug' },
                        ]}
                        onClick={handleClose}
                        onClose={handleClose}
                    />
                }
                placement="top-start"
                transformOrigin="0 0"
                container={сontainerRef}
                onOpen={handleOpen}
                onClose={handleClose}
            >
                <div className={style.input_action}>
                    <StyledIconButton size="small">
                        <MenuIcon fontSize="medium" />
                    </StyledIconButton>
                </div>
            </Popover>
            <div className={`${style.home_popover_container}`} ref={сontainer}></div>
        </React.Fragment>
    );
});

export default HomeMenuPopup;