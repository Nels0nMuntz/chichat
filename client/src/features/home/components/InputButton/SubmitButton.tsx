import React from 'react';
import classNames from 'classnames';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';

import style from './InputButton.module.scss';


type InputButtonProps = {
    mode: "text" | "voice"
    visible: boolean;
    handleSendTextMessage: () => void;
    handleRecordAudio: () => void;
};

const InputButton: React.FC<InputButtonProps> = React.memo(({ mode, visible, handleSendTextMessage, handleRecordAudio }) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.code === "Space" || e.code === "Enter") {
            mode === 'text' ? handleSendTextMessage() : handleRecordAudio();
        };
    };

    if (mode === 'text') return (
        <button
            type="button"
            className={classNames(
                'input-button',
                style.submit_button,
                !visible && style.hidden
            )}
            onClick={handleSendTextMessage}
            onKeyDown={handleKeyDown}
        >
            <SendIcon
                fontSize="inherit"
                className={`${style.adornment_icon} ${style.send_icon}`}
            />
        </button>
    );

    return (
        <button
            type="button"
            className={classNames(
                'input-button',
                style.submit_button,
                !visible && style.hidden
            )}
            onClick={handleRecordAudio}
            onKeyDown={handleKeyDown}
        >
            <MicIcon
                fontSize="inherit"
                className={`${style.adornment_icon} ${style.micro_icon}`}
            />
        </button>
    )
});

export default InputButton;