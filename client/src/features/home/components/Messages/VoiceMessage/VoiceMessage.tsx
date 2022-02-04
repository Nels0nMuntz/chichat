import React from 'react';

import { IMessageAttach } from 'features/home/models';
import { MessageContentAudio } from 'shared'

import './VoiceMessage.scss';


type VoiceMessageProps = {
    attach: Array<IMessageAttach>;
    onFetchAttach: (attach: IMessageAttach) => void;
};

const VoiceMessage: React.FC<VoiceMessageProps> = (props) => {

    const {
        attach,
        onFetchAttach,
    } = props;

    return (
        <React.Fragment>
            {attach.map((attachItem) => (
                <MessageContentAudio 
                    key={attachItem.attachId}
                    attach={attachItem}
                    onFetchAttach={onFetchAttach}
                />
            ))}
        </React.Fragment>
    );
};

export default VoiceMessage;