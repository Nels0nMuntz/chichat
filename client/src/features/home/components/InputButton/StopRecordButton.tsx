import React from 'react';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

import style from './InputButton.module.scss';


type StopRecordButtonProps = {
    handleClick: () => void;
};

const StopRecordButton: React.FC<StopRecordButtonProps> = ({ handleClick }) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.code === "Space" || e.code === "Enter") {
            handleClick();
        };
    };

    return (
        <button
            type="button"
            className={classNames(
                'input-button',
                style.stop_button,
            )}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <DeleteIcon
                fontSize="inherit"
                className={`${style.adornment_icon} ${style.stop_icon}`}
            />
        </button>
    );
};

export default StopRecordButton;