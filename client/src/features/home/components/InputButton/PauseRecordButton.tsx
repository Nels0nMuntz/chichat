import React from 'react';
import classNames from 'classnames';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';


import { RecordState } from '../../models';

import style from './InputButton.module.scss';


type PauseRecordButtonProps = {
    recordState: RecordState
    handleResumeRecord: () => void;
    handlePauseRecord: () => void;
};

const PauseRecordButton: React.FC<PauseRecordButtonProps> = React.memo(({ recordState, handleResumeRecord, handlePauseRecord }) => {

    const handleClick = () => {
        recordState === 'paused' && handleResumeRecord();
        recordState === 'recording' && handlePauseRecord();
    };

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
            )}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {recordState === 'recording' && (
                <PauseIcon
                    fontSize="inherit"
                    className={`${style.adornment_icon} ${style.pause_icon}`}
                />
            )}
            {recordState === 'paused' && (
                <PlayIcon
                    fontSize="inherit"
                    className={`${style.adornment_icon} ${style.pause_icon}`}
                />
            )}
        </button>
    );
});

export default PauseRecordButton;