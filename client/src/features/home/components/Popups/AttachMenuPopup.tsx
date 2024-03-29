import React from 'react';
import { withStyles } from '@material-ui/styles';
import PhotoIcon from '@mui/icons-material/Photo';
import AttachFileIcon from '@mui/icons-material/AttachFileOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { PopupMenu } from 'shared';
import { Popover } from 'shared';

import style from './Popups.module.scss'


const StyledAttachFileIcon = withStyles({
    root: {
        color: 'var(--color-text-100)',
        transition: 'color 0.1s linear',
        '&:hover': {
            color: 'var(--color-primary)',
        },
    }
})(AttachFileIcon);

type AttachMenuPopupProps = {
    open: boolean
    handleOpen: () => void
    handleClose: () => void
    handleClickMediaUpload: () => void;
    handleClickDocumentUpload: () => void;
};

const AttachMenuPopup: React.FC<AttachMenuPopupProps> = React.memo((props) => {

    const { 
        open, 
        handleOpen, 
        handleClose,
        handleClickMediaUpload,
        handleClickDocumentUpload,
    } = props;

    const сontainer = React.useRef<HTMLDivElement>(null);

    const [сontainerRef, setСontainerRef] = React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => setСontainerRef(сontainer.current), []);

    return (
        <React.Fragment>
            <Popover
                open={open}
                component={
                    <PopupMenu
                        menu={[
                            { 
                                icon: <PhotoIcon />, 
                                title: 'Photo or Video',
                                onClick: handleClickMediaUpload,
                            },
                            { 
                                icon: <InsertDriveFileIcon />, 
                                title: 'File',
                                onClick: handleClickDocumentUpload,
                            },
                        ]}
                        onClose={handleClose}
                    />
                }
                placement="bottom-end"
                transformOrigin="100% 100%"
                container={сontainerRef}
                onOpen={handleOpen}
                onClose={handleClose}
            >
                <button className={style.input_action}>
                    <StyledAttachFileIcon />
                </button>
            </Popover>
            <div className={`${style.message_popover_container} ${style.menu_container}`} ref={сontainer}></div>
        </React.Fragment>
    )
});

export default AttachMenuPopup;