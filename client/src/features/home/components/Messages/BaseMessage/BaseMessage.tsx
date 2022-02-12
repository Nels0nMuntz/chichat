import React from 'react';

import { IMessageStore, IMessageAttachStore } from 'features/home/models';
import MessageLayout from '../MessageLayout';
import { MessageContentVoice } from 'shared';


type BaseMessageProps = {
    userId: string;
    message: IMessageStore;
    selectMode: boolean;
    enableSelectMode: () => void;
    toggleSelectMessage: (message: IMessageStore) => void;
    handleFetchAttach: (messageId: string, attach: IMessageAttachStore) => void;
};

const BaseMessage: React.FC<BaseMessageProps> = React.memo((props) => {
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
    // const voiceAttach = isAttachExist ? attach.filter(({ attachType }) => attachType === 'voice') : [];
    const isVoiceMessage = isAttachExist && attach.some(({ attachType }) => attachType === 'voice');

    const onFetchAttach = React.useCallback((attach: IMessageAttachStore) => {
        handleFetchAttach(messageId, attach);
    }, [messageId]);

    const voiceAttachments = React.useMemo(() => {
        return attach?.map((attachItem) => (
            <MessageContentVoice
                messageId={messageId}
                key={attachItem.attachId}
                attach={attachItem}
                onFetchAttach={onFetchAttach}
            />
        ))
    }, [attach]);

    return (
        <MessageLayout
            userId={userId}
            message={message}
            selectMode={selectMode}
            enableSelectMode={enableSelectMode}
            toggleSelectMessage={toggleSelectMessage}
        >
            {isVoiceMessage
                ? (
                    <React.Fragment>
                        {voiceAttachments}
                    </React.Fragment>
                )
                : undefined}
        </MessageLayout>
    );
});

export default BaseMessage;