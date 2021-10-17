import React from 'react';

import EmojiPickerPopup from '../Popups/EmojiPickerPopup';
import AttachMenuPopup from '../Popups/AttachMenuPopup';
import SubmitButton from '../SubmitButton/SubmitButton';
import MessageTextarea from '../MessageTextarea/MessageInput';

import style from './MessageInput.module.scss';


type MessageInputProps = {
    value: string;
    menuPopup: boolean;
    emojiPopup: boolean;
    handleValueChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    handleOpenEmojiPopup: () => void;
    handleCloseEmojiPopup: () => void;
    handleOpenMenuPopup: () => void;
    handleCloseMenuPopup: () => void;
    handleSendTextMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = (props) => {

    const {
        value,
        menuPopup,
        emojiPopup,
        handleValueChange,
        handleOpenEmojiPopup,
        handleCloseEmojiPopup,
        handleOpenMenuPopup,
        handleCloseMenuPopup,
        handleSendTextMessage,
    } = props;

    return (
        <div className={style.message_input}>
            <div className={style.wrapper}>
                <div className={style.input_wrapper}>
                    <div className={style.input_action_wrapper}>
                        <EmojiPickerPopup
                            open={emojiPopup}
                            handleOpen={handleOpenEmojiPopup}
                            handleClose={handleCloseEmojiPopup}
                        />
                    </div>
                    <MessageTextarea
                        value={value}
                        handleChange={handleValueChange}
                    />
                    <div className={style.input_action_wrapper}>
                        <AttachMenuPopup
                            open={menuPopup}
                            handleOpen={handleOpenMenuPopup}
                            handleClose={handleCloseMenuPopup}
                        />
                    </div>
                    <div className={style.input_wrapper_appendex}>
                        <svg width="9" height="20" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fillRule="evenodd">
                                <path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="var(--color-bg)"></path>
                            </g>
                        </svg>
                    </div>
                </div>
                <SubmitButton
                    mode={Boolean(value) ? "text" : "voice"}
                    handleSendTextMessage={handleSendTextMessage}
                />
            </div>
        </div>
    )
};

export default MessageInput;