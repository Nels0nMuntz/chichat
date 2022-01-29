import React from 'react';
import classNames from 'classnames';

import MessageLayout from '../MessageLayout';
import { IMessage } from 'features/home/models';
import {
    MessageContentAudio,
} from 'shared'

import './VoiceMessage.scss';


type VoiceMessageProps = {
    userId: string;
    message: IMessage;
    selectMode: boolean;
    enableSelectMode: () => void;
    toggleSelectMessage: (message: IMessage) => void;
};

const VoiceMessage: React.FC<VoiceMessageProps> = React.memo((props) => {

    const {
        userId,
        message,
        selectMode,
        enableSelectMode,
        toggleSelectMessage,
    } = props;

    const hasText = !!message.content.text;

    return (
        <div className={classNames(
            'voice-message',
            !hasText && 'voice-message_no-text'
        )}>
            <MessageLayout
                userId={userId}
                message={message}
                selectMode={selectMode}
                enableSelectMode={enableSelectMode}
                toggleSelectMessage={toggleSelectMessage}
            >
                <MessageContentAudio />
            </MessageLayout>
        </div>
    );
});

export default VoiceMessage;