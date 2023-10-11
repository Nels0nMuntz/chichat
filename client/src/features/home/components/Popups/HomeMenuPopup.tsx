import React, { useCallback } from 'react';
import { withStyles } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ThemeSwitch from '../Switch/Switch';
import { Popover, PopupMenu, ThemeContext } from 'shared';

import style from './Popups.module.scss';
import { useDispatch } from "react-redux";
import { setProfileEditModeAction } from "features/home/store";


const StyledIconButton = withStyles({
    root: {
        padding: '8px',
        '&:hover': {
            backgroundColor: 'var(--touche-ripple-hover)',
        },
        '& .MuiSvgIcon-root': {
            fill: "var(--color-text-100)",
        },
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

type HomeMenuPopupProps = {
    searchMode: boolean;
    handleDisableSearchMode: () => void
};

const HomeMenuPopup: React.FC<HomeMenuPopupProps> = React.memo(({ searchMode, handleDisableSearchMode }) => {

    const dispatch = useDispatch();

    const сontainer = React.useRef<HTMLDivElement>(null);

    const [open, setOpen] = React.useState(false);
    const [сontainerRef, setСontainerRef] = React.useState<HTMLDivElement | null>(null);

    const { switchTheme } = React.useContext(ThemeContext);

    const openProfileEditView = React.useCallback(() => dispatch(setProfileEditModeAction({ payload: true })), []);

    const handleOpen = React.useCallback(() => { 
        if(searchMode){
            handleDisableSearchMode();
            return;
        };
        setOpen(true);
    }, [searchMode]);
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
                            { icon: <EditIcon />, title: 'Edit profile', onClick: openProfileEditView },
                            <StyledListItem button={true} onClick={switchTheme} key="Night Mode">
                                <ListItemIcon>
                                    <NightsStayIcon />
                                </ListItemIcon>
                                <ListItemText>Night Mode</ListItemText>
                                <ThemeSwitch />
                            </StyledListItem>,
                            { icon: <HelpOutlineOutlinedIcon />, title: 'ChiChat Features' },
                            { icon: <BugReportOutlinedIcon />, title: 'Report Bug' },
                        ]}
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
                        {searchMode ? (
                            <ArrowBackIcon fontSize="medium" />
                        ) : (
                            <MenuIcon fontSize="medium" />
                        )}
                    </StyledIconButton>
                </div>
            </Popover>
            <div className={`${style.home_popover_container}`} ref={сontainer}></div>
        </React.Fragment>
    );
});

export default HomeMenuPopup;