import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import EmojiPickerPopup from '../Popups/EmojiPickerPopup';
import AttachMenuPopup from '../Popups/AttachMenuPopup';
import SubmitButton from '../SubmitButton/SubmitButton';

import style from './MessageInput.module.scss';


const MessageInput: React.FC = React.memo(() => {

    const [value, setValue] = React.useState('');
    const [popups, setPopups] = React.useState({
        emoji: false,
        menu: false,
    });

    const handleOpenEmojiPopup = React.useCallback(() => setPopups({ emoji: true, menu: false }), []);
    const handleCloseEmojiPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);
    const handleOpenMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: true }), []);
    const handleCloseMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);

    return (
        <div className={style.wrapper}>
            <div className={style.input_wrapper}>
                <div className={style.input_action_wrapper}>
                    <EmojiPickerPopup
                        open={popups.emoji}
                        handleOpen={handleOpenEmojiPopup}
                        handleClose={handleCloseEmojiPopup}
                    />
                </div>
                <TextareaAutosize
                    className={style.textarea}
                    placeholder="Message"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <div className={style.input_action_wrapper}>
                    <AttachMenuPopup
                        open={popups.menu}
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
            <SubmitButton value={value} />
        </div>
    )
});

export default MessageInput;