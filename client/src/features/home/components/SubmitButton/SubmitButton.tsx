import React from 'react';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';

import style from './SubmitButton.module.scss';


type SubmitButtonProps = {
    mode: "text" | "voice"
};

const SubmitButton: React.FC<SubmitButtonProps> = React.memo(({ mode }) => {
    return (
        <button
            type="button"
            className={style.submit_button}
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