import React from 'react';

import { IMessageAttach } from 'features/home/models';
import { MessageContentVoice, UniqueId } from 'shared';

import './VoiceMessage.scss';


type VoiceMessageProps = {
    messageId: UniqueId;
    attach: Array<IMessageAttach>;
    onFetchAttach: (attach: IMessageAttach) => void;
};

const VoiceMessage: React.FC<VoiceMessageProps> = (props) => {

    const {
        messageId,
        attach,
        onFetchAttach,
    } = props;

    return (
        <React.Fragment>
            {attach.map((attachItem) => (
                <MessageContentVoice
                    messageId={messageId}
                    key={attachItem.attachId}
                    attach={attachItem}
                    onFetchAttach={onFetchAttach}
                />
            ))}
        </React.Fragment>
    );
};

export default VoiceMessage;