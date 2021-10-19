import React from 'react';
import classNames from 'classnames';
import { ChildrenProps } from 'shared/models/childrenProps.model';

import '../MessageItem.scss';


type MessageItemProps = ChildrenProps & {
    isOwn: boolean;
};

const MessageItem: React.FC<MessageItemProps> = ({ children, isOwn }) => {
    return (
        <div className={classNames(
            "message-list-item",
            "message-item",
            isOwn && "own",
        )}>
            <div className="message-item__select-control"></div>
            <div className="message-item__content-wrapper" onClick={() => console.log("wrapper")}>
                {children}
            </div>
        </div>
    )
};

export default MessageItem;