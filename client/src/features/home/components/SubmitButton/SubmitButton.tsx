import React from 'react';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';

import style from './SubmitButton.module.scss';


type SubmitButtonProps = {
    value: string
};

const SubmitButton: React.FC<SubmitButtonProps> = React.memo(({ value }) => {
    return (
        <button
            type="button"
            className={style.submit_button}
        >
            {!!value ? (
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
}, (prev, next) => !!prev.value === !!next.value);

export default SubmitButton;