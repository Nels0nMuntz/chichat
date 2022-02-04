import React from 'react';


type MessageContentTextProps = {
    children?: string;
    // selectMode: boolean;
    // meta?: string | JSX.Element;
    // handleMessageClick: () => void;
};

const MessageContentText: React.FC<MessageContentTextProps> = ({ children }) => {

    // const onClickMessage = () => !selectMode && handleMessageClick();

    return (
        <div className="message-item__content-item message-item__content-text">
            {children || null}
        </div>
    )
};

export default MessageContentText;