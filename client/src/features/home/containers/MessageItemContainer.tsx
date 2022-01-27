import React from 'react';

import PlainMessageItem from './../components/Messages/PlainMessageItem';
import { IMessage } from 'features/home/models';


type MessageItemContainerProps = {
    userId: string;
    message: IMessage;
    selectMode: boolean;
    enableSelectMode: () => void;
    toggleSelectMessage: (message: IMessage) => void;
};

const MessageItemContainer: React.FC<MessageItemContainerProps> = React.memo((props) => {
    const { userId, message, selectMode, enableSelectMode, toggleSelectMessage } = props;
    return (
        <PlainMessageItem
            userId={userId}
            message={message}
            selectMode={selectMode}
            enableSelectMode={enableSelectMode}
            toggleSelectMessage={toggleSelectMessage}
        />
    );
});

export default MessageItemContainer;