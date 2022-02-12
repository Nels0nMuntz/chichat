import React from 'react';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreActionsPopup from '../Popups/MoreActionsPopup';
import { Avatar, IUser, getUserFullname } from 'shared';

import style from './MiddleColumnHeader.module.scss';


const StyledIconButton = withStyles({
    root: {
        '& .MuiSvgIcon-root': {
            color: 'var(--color-text-100)',
        },
    },
    sizeSmall: {
        padding: '8px',
    },
})(IconButton);

type MiddleColumnHeaderProps = {
    member: IUser | null;
    matches: boolean;
    sidebarVisibility: boolean;
    toggleSearchbarVisility: () => void;
    toggleDialogsbarVisibility: () => void;
};

const MiddleColumnHeader: React.FC<MiddleColumnHeaderProps> = React.memo((props) => {

    const {
        member,
        matches,
        sidebarVisibility,
        toggleSearchbarVisility,
        toggleDialogsbarVisibility,
    } = props

    if(!member) return null;

    return (
        <header className={style.middle_header}>
            <div className="user-info middle_header_info">
                {matches && (
                    <div className={style.mainHeaderActionsButton} onClick={toggleDialogsbarVisibility}>
                        <StyledIconButton size="small">
                            {sidebarVisibility ? (
                                <CloseIcon />
                            ) : (
                                <ArrowBackIcon />
                            )}
                        </StyledIconButton>
                    </div>
                )}
                <div className="avatar-wrapper">
                    <div className={`${style.avatar} avatar`}>
                        <Avatar user={member} />
                    </div>
                </div>
                <div className="info">
                    <div className="title">
                        <h3>{getUserFullname(member)}</h3>
                    </div>
                    <div className={'subtitle'}>
                        <span className="last-seen">last seen 23.06.2021</span>
                    </div>
                </div>
            </div>
            <div className={style.middle_header_actions}>
                <div className={style.actionsButtonWrapper} onClick={toggleSearchbarVisility}>
                    <StyledIconButton size="small">
                        <SearchRoundedIcon />
                    </StyledIconButton>
                </div>
                <div className={style.actionsButtonWrapper}>
                    <MoreActionsPopup />
                </div>
            </div>
        </header>
    )
});

export default MiddleColumnHeader;