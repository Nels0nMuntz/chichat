import React from 'react';
import { ChildrenProps } from 'shared/models/childrenProps.model';

import '../MessageItem.scss';


type MessageItemProps = ChildrenProps;

const MessageItem: React.FC<MessageItemProps> = ({ children }) => {
    return (
        <div className="message-list-item message-item select-mode selected">
            <div className="message-item__select-control"></div>
            <div className="message-item__content-wrapper" onClick={() => console.log("wrapper")}>
                {children}
            </div>
        </div>
    )
};

export default MessageItem;