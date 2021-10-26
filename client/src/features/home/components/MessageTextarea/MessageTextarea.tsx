import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import style from './MessageTextarea.module.scss';


type MessageTextareaProps = {
    value: string;
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement>
};

const MessageTextarea: React.FC<MessageTextareaProps> = React.memo(({ value, handleChange }) => {

    return (
        <TextareaAutosize
            className={style.textarea}
            placeholder="Message"
            value={value}
            onChange={handleChange}
        />
    )
});

export default MessageTextarea;