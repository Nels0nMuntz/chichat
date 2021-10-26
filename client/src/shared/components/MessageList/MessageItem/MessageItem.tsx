import React from 'react';
import classNames from 'classnames';

import { ChildrenProps } from 'shared';

import '../MessageItem.scss';


type MessageItemProps = ChildrenProps & {
    isOwn: boolean;
    selected: boolean;
    selectMode: boolean;
    handleSelectMessage: () => void;
};

const MessageItem: React.FC<MessageItemProps> = ({ children, isOwn, selected, selectMode, handleSelectMessage }) => {

    const onClickMessage = () => selectMode && handleSelectMessage();

    return (
        <div 
            className={classNames(
                "message-list-item",
                selected && "selected",
                selectMode && "select-mode",
                isOwn && "own",
            )}
            onClick={onClickMessage}
        >
            <div
                className={classNames(
                    "message-list-item__inner",
                    "message-item",
                )}
            >
                <div className="message-item__select-control"></div>
                <div className="message-item__content-wrapper">
                    {children}
                </div>
            </div>
        </div>
    )
};

export default MessageItem;