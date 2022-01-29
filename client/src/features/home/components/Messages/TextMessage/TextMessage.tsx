
import React from 'react';

import MessageLayout from '../MessageLayout';
import { MessageProps } from 'features/home/models';


const TextMessage: React.FC<MessageProps> = React.memo((props) => {

    const {
        userId,
        message,
        selectMode,
        enableSelectMode,
        toggleSelectMessage,
    } = props;

    return (
        <MessageLayout
            userId={userId}
            message={message}
            selectMode={selectMode}
            enableSelectMode={enableSelectMode}
            toggleSelectMessage={toggleSelectMessage}
        />
    );
});

export default TextMessage;
