import React from 'react';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const StyledIconButton = withStyles({
    root: {
        padding: '6px',
        '&:hover': {
            backgroundColor: 'var(--touche-ripple-hover)',
        },
        '& .MuiSvgIcon-root': {
            fontSize: "1rem",
            fill: "var(--color-text-100)",
        },
    },
})(IconButton);

type CloseIconButtonProps = {
    onClick: () => void;
};

const CloseIconButton: React.FC<CloseIconButtonProps> = ({ onClick }) => {
    return (
        <StyledIconButton size="small" onClick={onClick} >
            <CloseIcon />
        </StyledIconButton>
    )
};

export default CloseIconButton;