import React from 'react';

import PlayIcon from '@material-ui/icons/PlayArrow';



type MessageContentAudioProps = {
    selectMode: boolean;
    meta?: string | JSX.Element;
    handlePlay: () => void;
    handleStop: () => void;
    handleMessageClick: () => void;
};

const MessageContentAudio: React.FC<MessageContentAudioProps> = (props) => {

    const {
        selectMode,
        meta,
        handlePlay,
        handleStop,
        handleMessageClick,
    } = props;

    return (
        <div className="message-item__content audio-message-item">
            <div className="audio-message-item__inner">
                <div className="audio-control">
                    <button className="audio-control__btn" type="button" title="Play audio">
                        <span className="visually-hidden">Play audio</span>
                        <PlayIcon />
                    </button>
                    <div className="audio-control__content audio-control__content_unread">
                        <div className="audio-control__waveform"></div>
                        <div className="audio-control__duration">0:03</div>
                    </div>
                </div>
                {
                    meta
                        ? <span 
                            className="message-text-content__meta"
                            onClick={handleMessageClick}
                        >
                            {meta}
                        </span>
                        : null
                } 
            </div>
        </div>
    )
}

export default MessageContentAudio
