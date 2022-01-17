import React from 'react';


type MessageContentTextProps = {
    children?: string;
    selectMode: boolean;
    meta?: string | JSX.Element;
    handleMessageClick: () => void;
};

const MessageContentText : React.FC<MessageContentTextProps> = ({ children, selectMode, meta, handleMessageClick }) => {

    const onClickMessage = () => !selectMode && handleMessageClick();

    return (
        <div className="message-item__content message-item__content_text message-text-content">
            <p className="message-text-content__text">
                {children || null}
                {
                    meta
                        ? <span 
                            className="message-text-content__meta"
                            onClick={onClickMessage}
                        >
                            {meta}
                        </span>
                        : null
                }                
            </p>
        </div>
    )
};

export default MessageContentText;