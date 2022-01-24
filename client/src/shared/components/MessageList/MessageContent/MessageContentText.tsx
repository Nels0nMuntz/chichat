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
        <div className="message-content-text">
            {children || null}
        </div>
    )
};

export default MessageContentText;