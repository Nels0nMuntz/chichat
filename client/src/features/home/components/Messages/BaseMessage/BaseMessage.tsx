import React from 'react';

import { IMessage } from 'features/home/models';
import TextMessage from '../TextMessage/TextMessage';
import VoiceMessage from '../VoiceMessage/VoiceMessage';
import MessageLayout from '../MessageLayout';


type BaseMessageProps = {
    userId: string;
    message: IMessage;
    selectMode: boolean;
    enableSelectMode: () => void;
    toggleSelectMessage: (message: IMessage) => void;
};

const BaseMessage: React.FC<BaseMessageProps> = (props) => {
    const { userId, message, selectMode, enableSelectMode, toggleSelectMessage } = props;

    const attach = message.content.attach;
    const isVoiceMessage = !!attach?.length && attach.some(({ attachType }) => attachType === 'voice');

    return (
        <MessageLayout
            userId={userId}
            message={message}
            selectMode={selectMode}
            enableSelectMode={enableSelectMode}
            toggleSelectMessage={toggleSelectMessage}
        >
            {isVoiceMessage
                ? <VoiceMessage message={message} />
                : undefined}
        </MessageLayout>
    );

    // if (isVoiceMessage) {
    //     return (
    //         <VoiceMessage
    //             userId={userId}
    //             message={message}
    //             selectMode={selectMode}
    //             enableSelectMode={enableSelectMode}
    //             toggleSelectMessage={toggleSelectMessage}
    //         />
    //     )
    // };

    // return (
    //     <TextMessage
    //         userId={userId}
    //         message={message}
    //         selectMode={selectMode}
    //         enableSelectMode={enableSelectMode}
    //         toggleSelectMessage={toggleSelectMessage}
    //     />
    // );
};

export default BaseMessage;