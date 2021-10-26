import React from 'react';
import format from 'date-fns/format';

import { IMessage } from '../../../models';
import { MessageContentText, MessageItem } from 'shared';


const formatTime = (date: Date): string => {
    return format(new Date(date), "HH:mm");
};

type TextMessageItemProps = {
    userId: string;
    message: IMessage;
    selectMode: boolean;
    enableSelectMode: () => void;
    toggleSelectMessage: (message: IMessage) => void;
};

const TextMessageItem: React.FC<TextMessageItemProps> = React.memo((props) => {

    const { userId, message, selectMode, enableSelectMode, toggleSelectMessage } = props;

    const handleSelectMessage = React.useCallback(() => {
        toggleSelectMessage(message)
    }, [message, toggleSelectMessage]);
    const handleMessageClick = React.useCallback(() => {
        enableSelectMode();
        toggleSelectMessage(message);
    }, [message, enableSelectMode, toggleSelectMessage]);

    return (
        <MessageItem
            isOwn={message.createdBy === userId}
            selected={message.selected}
            selectMode={selectMode}
            handleSelectMessage={handleSelectMessage}
        >
            <MessageContentText
                selectMode={selectMode}
                meta={formatTime(new Date(message.createdAt))}
                handleMessageClick={handleMessageClick}
            >
                {message.content.text}
            </MessageContentText>
        </MessageItem>
    )
});

export default TextMessageItem;