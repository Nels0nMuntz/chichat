import React from 'react';

import { IMessageStore, IMessageAttachStore } from 'features/home/models';
import MessageLayout from '../MessageLayout';
import VoiceMessage from '../VoiceMessage/VoiceMessage';
import ImageMessage from '../ImageMessage/ImageMessage';
import VideoMessage from "../VideoMessage/VideoMessage";
import FileMessage from "../FileMessage/FileMessage";


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

    const onFetchAttach = React.useCallback((attach: IMessageAttachStore) => {
        handleFetchAttach(messageId, attach);
    }, [messageId]);

    const attachments = React.useMemo(() => {
        const isAttachExist = !!attach?.length;
        const isVoiceMessage = isAttachExist && attach.every(({ attachType }) => attachType === 'voice');
        const isImageMessage = isAttachExist && attach.every(({ attachType }) => attachType === 'image');
        const isVideoMessage = isAttachExist && attach.every(({ attachType }) => attachType === 'video');
        const isFileMessage = isAttachExist && attach.every(({ attachType }) => attachType === 'file');

        if (isVoiceMessage) return (
            attach.map((attachItem) => (
                <VoiceMessage
                    messageId={messageId}
                    key={attachItem.attachId}
                    attach={attachItem}
                    onFetchAttach={onFetchAttach}
                />
            ))
        );
        if (isVideoMessage) return (
            attach.map((attachItem) => (
                <VideoMessage
                    key={attachItem.attachId}
                    attach={attachItem}
                />
            ))
        );
        if (isImageMessage) return (
            <React.Fragment>
                {attach.map(item => <ImageMessage attach={item} />)}
            </React.Fragment>
        );
        if (isFileMessage) return (
            attach.map((attachItem) => (
                <FileMessage
                    key={attachItem.attachId}
                    attach={attachItem}
                />
            ))
        );
        return;
    }, [attach]);

    return (
        <MessageLayout
            userId={userId}
            message={message}
            selectMode={selectMode}
            enableSelectMode={enableSelectMode}
            toggleSelectMessage={toggleSelectMessage}
        >
            {attachments}
        </MessageLayout>
    );
});

export default BaseMessage;