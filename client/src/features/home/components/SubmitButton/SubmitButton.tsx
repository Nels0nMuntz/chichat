import React from 'react';
import classNames from 'classnames';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';

import style from './SubmitButton.module.scss';


type SubmitButtonProps = {
    mode: "text" | "voice"
    visible: boolean;
    handleSendTextMessage: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = React.memo(({ mode, visible, handleSendTextMessage }) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if(e.code === "Space" || e.code === "Enter") handleSendTextMessage()
    };

    return (
        <button
            type="button"
            className={classNames(
                style.submit_button,
                !visible && style.hidden
            )}
            onClick={handleSendTextMessage}
            onKeyDown={handleKeyDown}
        >
            {mode === "text" ? (
                <SendIcon
                    fontSize="inherit"
                    className={`${style.adornment_icon} ${style.send_icon}`}
                />
            ) : (
                <MicIcon
                    fontSize="inherit"
                    className={`${style.adornment_icon} ${style.micro_icon}`}
                />
            )}
        </button>
    )
});

export default SubmitButton;