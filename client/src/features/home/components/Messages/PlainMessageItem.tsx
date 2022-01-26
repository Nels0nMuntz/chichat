import React from 'react';
import format from 'date-fns/format';

import { IMessage } from '../../models';
import {
    MessageContentText,
    MessageItem as Wrapper,
    MessageContentAudio,
} from 'shared';

import style from './PlainMessageItem.module.scss';


const formatTime = (date: Date): string => {
    return format(new Date(date), "HH:mm");
};

type PlainMessageItemProps = {
    userId: string;
    message: IMessage;
    selectMode: boolean;
    enableSelectMode: () => void;
    toggleSelectMessage: (message: IMessage) => void;
};

const PlainMessageItem: React.FC<PlainMessageItemProps> = React.memo((props) => {

    const { userId, message, selectMode, enableSelectMode, toggleSelectMessage } = props;

    const handleMessageClick = React.useCallback(() => {
        enableSelectMode();
        toggleSelectMessage(message);
    }, [message, enableSelectMode, toggleSelectMessage]);

    const isAudioMessage = !!message.content.attach?.audio?.length;
    const url = message.content.attach?.audio && message.content.attach?.audio[0];

    return (
        <Wrapper
            isOwn={message.createdBy === userId}
            selected={message.selected}
            selectMode={selectMode}
            meta={formatTime(new Date(message.createdAt))}
            handleSelectMessage={handleMessageClick}
        >
            <React.Fragment>
                {isAudioMessage && url && (
                    <div className={style.audioWrap}>
                        <MessageContentAudio
                            url={url}
                        />
                    </div>
                )}
                <MessageContentText
                >
                    {message.content.text}
                </MessageContentText>
            </React.Fragment>
        </Wrapper>
    )
});

export default PlainMessageItem;