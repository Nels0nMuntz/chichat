import React from 'react';
import classNames from 'classnames';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';

import style from './InputButton.module.scss';


type SubmitButtonProps = {
    editMode: boolean;
    visible: boolean;
    handleClick: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = React.memo((props) => {

    const {
        editMode,
        visible,
        handleClick,
    } = props;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.code === "Space" || e.code === "Enter") {
            handleClick();
        };
    };

    return (
        <button
            type="button"
            className={classNames(
                style.input_button,
                style.submit_button,
                !visible && style.hidden
            )}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {editMode ? (
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
    );
});

export default SubmitButton;