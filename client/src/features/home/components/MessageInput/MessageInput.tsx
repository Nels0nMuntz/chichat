import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { BaseEmoji } from 'emoji-mart';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EmojiPickerPopup from '../Popups/EmojiPickerPopup';
import AttachMenuPopup from '../Popups/AttachMenuPopup';
import SubmitButton from '../InputButton/SubmitButton';
import StopRecordButton from '../InputButton/StopRecordButton';
import PauseRecordButton from '../InputButton/PauseRecordButton';
import MessageTextarea from '../MessageTextarea/MessageTextarea';

import RecordRunner from './../RecordRunner/RecordRunner';
import { RecordState } from '../../models';

import style from './MessageInput.module.scss';


const StyledIconButton = withStyles({
    root: {
        padding: '8px',
        '& .MuiSvgIcon-root': {
            color: 'var(--color-text-100)',
        },
        '& .MuiSvgIcon-root.delete-icon-button': {
            color: 'var(--color-error)',
        },
        '&:hover': {
            backgroundColor: 'var(--color-icon-button-hover)',
        }
    },
})(IconButton);

type MessageInputProps = {
    value: string;
    menuPopup: boolean;
    emojiPopup: boolean;
    selectedMessages: number;
    editMode: boolean;
    selectMode: boolean;
    recordState: RecordState;
    handleValueChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    handleOpenEmojiPopup: () => void;
    handleCloseEmojiPopup: () => void;
    handleOpenMenuPopup: () => void;
    handleCloseMenuPopup: () => void;
    handleClickSubmitButton: () => void;
    handleSelectEmoji: (emoji: BaseEmoji) => void;
    disableSelectMode: () => void;
    handleDeleteMessages: () => void;
    handleClickMediaUpload: () => void;
    handleClickDocumentUpload: () => void;
    handlePauseRecordAudio: () => void;
    handleResumeRecordAudio: () => void;
    handleCancelRecordAudio: () => void;
}

const MessageInput: React.FC<MessageInputProps> = (props) => {

    const {
        value,
        menuPopup,
        emojiPopup,
        selectedMessages,
        editMode,
        selectMode,
        recordState,
        handleValueChange,
        handleOpenEmojiPopup,
        handleCloseEmojiPopup,
        handleOpenMenuPopup,
        handleCloseMenuPopup,
        handleClickSubmitButton,
        handleSelectEmoji,
        disableSelectMode,
        handleDeleteMessages,
        handleClickMediaUpload,
        handleClickDocumentUpload,
        handlePauseRecordAudio,
        handleResumeRecordAudio,
        handleCancelRecordAudio,
    } = props;

    const isRecording = recordState === 'recording' || recordState === 'paused';

    return (
        <div className={classNames(
            style.message_input,
            selectMode && style.select_mode,
            "ignore-messages-track-click-away-listener",
        )}>
            <div className={style.wrapper}>
                <div className={style.input_wrapper}>
                    <div className={style.input_action_wrapper}>
                        {selectMode ? (
                            <StyledIconButton
                                size="medium"
                                title="Exit select mode"
                                aria-label="Exit select mode"
                                onClick={disableSelectMode}
                            >
                                <CloseIcon />
                            </StyledIconButton>
                        ) : (
                            <EmojiPickerPopup
                                open={emojiPopup}
                                handleOpen={handleOpenEmojiPopup}
                                handleClose={handleCloseEmojiPopup}
                                handleSelect={handleSelectEmoji}
                            />
                        )}
                    </div>
                    {selectMode ? (
                        <span className={style.selectedMessagesText}>{`${selectedMessages} message${selectedMessages > 1 ? 's' : ''} selected`}</span>
                    ) : (
                        <MessageTextarea
                            value={value}
                            handleChange={handleValueChange}
                        />
                    )}
                    {selectMode ? (
                        <React.Fragment>
                            <div className={`${style.input_action_wrapper} ${style.input_action_suffix} ${style.select_mode}`}>
                                <StyledIconButton
                                    size="medium"
                                    title="Forward messages"
                                    aria-label="Forward messages"
                                >
                                    <ReplyIcon />
                                </StyledIconButton>
                            </div>
                            <div className={`${style.input_action_wrapper} ${style.select_mode}`}>
                                <StyledIconButton
                                    size="medium"
                                    title="Delete messages"
                                    aria-label="Delete messages"
                                    onClick={handleDeleteMessages}
                                >
                                    <DeleteOutlineIcon className="delete-icon-button" />
                                </StyledIconButton>
                            </div>
                        </React.Fragment>
                    ) : (
                        <div className={style.input_action_wrapper}>
                            {!isRecording ? (
                                <AttachMenuPopup
                                    open={menuPopup}
                                    handleOpen={handleOpenMenuPopup}
                                    handleClose={handleCloseMenuPopup}
                                    handleClickMediaUpload={handleClickMediaUpload}
                                    handleClickDocumentUpload={handleClickDocumentUpload}
                                />
                            ) : (
                                <RecordRunner
                                    recordState={recordState}
                                />
                            )}
                        </div>
                    )}
                    <div className={style.input_wrapper_appendex}>
                        <svg width="9" height="20" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fillRule="evenodd">
                                <path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="var(--color-bg)"></path>
                            </g>
                        </svg>
                    </div>
                </div>
                {isRecording && (
                    <React.Fragment>
                        <StopRecordButton
                            handleClick={handleCancelRecordAudio}
                        />
                        <PauseRecordButton
                            recordState={recordState}
                            handleResumeRecord={handleResumeRecordAudio}
                            handlePauseRecord={handlePauseRecordAudio}
                        />
                    </React.Fragment>
                )}
                <SubmitButton
                    visible={!selectedMessages}
                    editMode={editMode}
                    handleClick={handleClickSubmitButton}
                />
            </div>
        </div >
    )
};

export default MessageInput;