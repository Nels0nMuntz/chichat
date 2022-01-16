import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { IDialogAttach } from './../../models/common/dialog.model';
import { CloseIconButton, SubmitButton, LoadingBackdrop } from 'shared';

import style from './UploadFileModal.module.scss';


const bytes = ['B', 'KB', 'MB', 'GB'];

const getFileExt = (file: File) => {
    return file.name.split('.').pop();
};

const getFileSize = (size: number, count?: number): any => {
    const _count = count || 0;
    if (size / 1000 < 1) {
        return (Math.trunc(size * 10) / 10).toString() + ` ${bytes[_count]}`;
    } else {
        return getFileSize(size / 1000, _count + 1);
    };
};

const useStyles = makeStyles({
    paper: {
        width: '100%',
        maxWidth: '420px',
        margin: '50px 15px',
        backgroundColor: 'var(--color-bg)',
        borderRadius: '10px',
    },
    actions: {
        padding: '8px 20px 0px',

        '& > button:last-of-type': {
            width: 'auto',
            minWidth: '80px',
            maxWidth: '100px',
            minHeight: 'unset',
            padding: '9px',
            fontSize: '14px',
            fontWeight: 400,
            textAlign: 'center',
            borderRadius: '6px',
            backgroundColor: 'var(--color-primary)',
            transition: 'background-color 0.1s linear',

            '&:hover': {
                backgroundColor: 'var(--color-primary-hover)',
            },
        },
    },
    spacing: {
        '& > :not(:first-child)': {
            marginLeft: '20px',
        },
    },
    title: {
        flexGrow: 1,
        padding: '0px',
        color: 'var(--color-text)',
    },
    content: {
        padding: '8px 20px 30px',
    }
});

type UploadFileModalProps = {
    open: boolean;
    valid: boolean;
    uploading: boolean;
    sending: boolean;
    messageValue: string;
    attach?: Array<IDialogAttach>;
    handleClose: () => void;
    handleSubmit: () => void;
    handleChangeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const UploadFileModal: React.FC<UploadFileModalProps> = React.memo((props) => {

    const {
        open,
        uploading,
        sending,
        messageValue,
        attach,
        handleClose,
        handleSubmit,
        handleChangeText,
    } = props;

    const classes = useStyles();

    const textareaEl = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => textareaEl.current?.focus());

    if (uploading) {
        return (
            <LoadingBackdrop open={true} />
        );
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-slide-label'
            classes={{ paper: classes.paper }}
            disablePortal
        >
            <DialogActions
                classes={{
                    root: classes.actions,
                    spacing: classes.spacing,
                }}
            >
                <CloseIconButton onClick={handleClose} />
                <DialogTitle
                    id='alert-dialog-slide-label'
                    classes={{ root: classes.title }}
                >
                    Send Files
                </DialogTitle>
                <SubmitButton
                    text='Send'
                    isSubmitting={sending}
                    isValid={true}
                />
            </DialogActions>
            <DialogContent classes={{ root: classes.content }}>
                <div className={style.contentGrid}>
                    {attach && attach.map(({ file, previewLink }, i) => {
                        if (file.type.includes('image')) return (
                            <div className={`${style.contentItem} ${style.contentItemMedia}`} key={i}>
                                <img src={previewLink} alt="attachment" />
                            </div>
                        );
                        if (file.type.includes('video')) return (
                            <div className={`${style.contentItem} ${style.contentItemMedia}`} key={i}>
                                <video autoPlay loop muted={!open}>
                                    <source src={previewLink} type={file.type} />
                                </video>
                            </div>
                        );
                        return (
                            <div className={style.contentItem} key={i}>
                                <div className={style.contentItemIcon}>
                                    <span>{getFileExt(file)}</span>
                                </div>
                                <div className={style.contentItemInfo}>
                                    <div className={style.contentItemTitle}>
                                        {file.name}
                                    </div>
                                    <div className={style.contentItemSubtitle}>{getFileSize(file.size)}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={style.contentInputWrap}>
                    <TextareaAutosize
                        className={style.contentInput}
                        placeholder="Caption"
                        value={messageValue}
                        onChange={handleChangeText}
                        ref={textareaEl}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
});

export default UploadFileModal;