import React from 'react';
import classNames from 'classnames';

import { ChildrenProps } from 'shared';

import '../MessageItem.scss';


type MessageItemProps = ChildrenProps & {
    isOwn: boolean;
    selected: boolean;
    selectMode: boolean;
    meta?: string | JSX.Element;
    onlyMedia?: boolean;
    handleSelectMessage: () => void;
};

const MessageItem: React.FC<MessageItemProps> = (props) => {

    const {
        children,
        isOwn,
        selected,
        selectMode,
        meta,
        onlyMedia,
        handleSelectMessage
    } = props;

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
                <div className="message-item__content-wrap">
                    {children}
                    {meta
                        ? <span
                            className={classNames(
                                "message-item__meta",
                                onlyMedia && "message-item__meta_bg",
                            )}
                            onClick={handleSelectMessage}
                        >
                            {meta}
                        </span>
                        : null
                    }
                </div>
            </div>
        </div>
    )
};

export default MessageItem;