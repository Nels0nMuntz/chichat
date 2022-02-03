import React from 'react';
// import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { IMessage } from 'features/home/models';
import { fetchMessageAttachAction } from 'features/home/store';
import { MessageContentAudio } from 'shared'

import './VoiceMessage.scss';


type VoiceMessageProps = {
    message: IMessage;
};

const VoiceMessage: React.FC<VoiceMessageProps> = React.memo((props) => {

    const dispatch = useDispatch();

    const {
        message,
    } = props;

    React.useEffect(() => {
        if(!message.content.attach || !message.content.attach.length) return;
        const preloadAttach = message.content.attach.filter(({ attachType }) => attachType === 'voice' || attachType === 'video');
        if(!preloadAttach.length) return;
        dispatch(fetchMessageAttachAction({ payload: { messageId: message.messageId, attach: preloadAttach } }));
    }, []);

    return (
        // <div className={classNames(
        //     'voice-message',
        //     !hasText && 'voice-message_no-text',
        // )}>
            <MessageContentAudio />
        // </div>
    );
});

export default VoiceMessage;