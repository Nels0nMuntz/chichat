import React from 'react';
import format from 'date-fns/format';

import { MessageProps } from '../../models';
import {
    MessageItem as Wrapper,
    ChildrenProps,
    MessageContentText,
} from 'shared';


const formatTime = (date: Date): string => {
    return format(new Date(date), "HH:mm");
};

type MessageLayoutProps = MessageProps & {
    children?: React.ReactChild | React.ReactChild[];
};

const MessageLayout: React.FC<MessageLayoutProps> = (props) => {

    const { userId, message, selectMode, children, enableSelectMode, toggleSelectMessage } = props;

    const text = message.content.text;

    const handleMessageClick = React.useCallback(() => {
        enableSelectMode();
        toggleSelectMessage(message);
    }, [message, enableSelectMode, toggleSelectMessage]);

    return (
        <Wrapper
            isOwn={message.createdBy === userId}
            selected={message.selected}
            selectMode={selectMode}
            meta={formatTime(new Date(message.createdAt))}
            handleSelectMessage={handleMessageClick}
        >
            <React.Fragment>
                {children}
                {text ? <MessageContentText>{message.content.text}</MessageContentText> : null}                
            </React.Fragment>
        </Wrapper>
    );
};

export default MessageLayout;