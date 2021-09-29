import React from 'react';


type MessageContentTextProps = {
    children?: string
    meta?: string | JSX.Element;
};

const MessageContentText : React.FC<MessageContentTextProps> = ({ meta, children }) => {
    return (
        <div className="message-item__content message-item__content--text message-text-content">
            <p className="message-text-content__text">
                {children || null}
                {
                    meta
                        ? <span className="message-text-content__meta">{meta}</span>
                        : null
                }                
            </p>
        </div>
    )
};

export default MessageContentText;