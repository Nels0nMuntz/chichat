import React from 'react';

import PlayIcon from '@material-ui/icons/PlayArrow';



type MessageContentAudioProps = {
    src?: string;
    // selectMode: boolean;
    // meta?: string | JSX.Element;
    // handlePlay: () => void;
    // handleStop: () => void;
    // handleMessageClick: () => void;
};

const MessageContentAudio: React.FC<MessageContentAudioProps> = (props) => {

    const {
        src,
        // selectMode,
        // meta,
        // handlePlay,
        // handleStop,
        // handleMessageClick,
    } = props;

    const audioEl = React.useRef<HTMLAudioElement>(null);

    React.useEffect(() => {
        if (audioEl && audioEl.current) {
            audioEl.current.onloadedmetadata = function () {
                const audio = audioEl.current;
                if (audio?.duration === Infinity) {
                    audio.currentTime = 1e101;
                    audio.ontimeupdate = function () {
                        this.ontimeupdate = () => undefined;
                        audio.currentTime = 0;
                        console.log(audio.duration);
                        return;
                    };
                };
            };
        }
    }, [audioEl]);

    return (
        <div className="message-content-audio">
            <div className="audio-control">
                <button className="audio-control__btn" type="button" title="Play audio">
                    <span className="visually-hidden">Play audio</span>
                    <PlayIcon fontSize="large" />
                </button>
                <audio src={src} ref={audioEl} controls></audio>
                <div className="audio-control__content audio-control__content_unread">
                    <div className="audio-control__waveform"></div>
                    <div className="audio-control__duration">0:03</div>
                </div>
            </div>
        </div>
    )
};

export default MessageContentAudio;