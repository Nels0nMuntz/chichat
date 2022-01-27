import React from 'react';

import PlayIcon from '@material-ui/icons/PlayArrow';


type MessageContentAudioProps = {
    url: string;
    // selectMode: boolean;
    // meta?: string | JSX.Element;
    // handlePlay: () => void;
    // handleStop: () => void;
    // handleMessageClick: () => void;
};

const MessageContentAudio: React.FC<MessageContentAudioProps> = (props) => {

    const {
        // url,
        // selectMode,
        // meta,
        // handlePlay,
        // handleStop,
        // handleMessageClick,
    } = props;

    return (
        <div className="message-content-audio">
            <div className="audio-control">
                <button className="audio-control__btn" type="button" title="Play audio">
                    <span className="visually-hidden">Play audio</span>
                    <PlayIcon fontSize="large" />
                </button>
                <div className="audio-control__content audio-control__content_unread">
                    <div className="audio-control__waveform"></div>
                    <div className="audio-control__duration">0:03</div>
                </div>
            </div>
        </div>
    )
};

export default MessageContentAudio;