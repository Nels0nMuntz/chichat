import React from 'react';

import { IMessage, IMessageAttach } from 'features/home/models';
import TextMessage from '../TextMessage/TextMessage';
import VoiceMessage from '../VoiceMessage/VoiceMessage';
import MessageLayout from '../MessageLayout';


type BaseMessageProps = {
    userId: string;
    message: IMessage;
    selectMode: boolean;
    enableSelectMode: () => void;
    toggleSelectMessage: (message: IMessage) => void;
    handleFetchAttach: (messageId: string, attach: IMessageAttach) => void;
};

const BaseMessage: React.FC<BaseMessageProps> = (props) => {
    const { 
        userId, 
        message, 
        selectMode, 
        enableSelectMode, 
        toggleSelectMessage,
        handleFetchAttach,
    } = props;

    const messageId = message.messageId;
    const attach = message.content.attach;    
    const isAttachExist = !!attach?.length;
    const voiceAttach = isAttachExist ? attach.filter(({ attachType }) => attachType === 'voice') : [];
    const isVoiceMessage = isAttachExist && attach.some(({ attachType }) => attachType === 'voice');

    const onFetchAttach = React.useCallback((attach: IMessageAttach) => {
        handleFetchAttach(messageId, attach);
    }, [messageId]);

    return (
        <MessageLayout
            userId={userId}
            message={message}
            selectMode={selectMode}
            enableSelectMode={enableSelectMode}
            toggleSelectMessage={toggleSelectMessage}
        >
            {isVoiceMessage
                ? <VoiceMessage attach={voiceAttach} onFetchAttach={onFetchAttach} />
                : undefined}
        </MessageLayout>
    );
};

export default BaseMessage;