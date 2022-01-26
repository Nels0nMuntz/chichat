import React from 'react';

import PlayIcon from '@material-ui/icons/PlayArrow';
import { firebaseSorage } from 'services';
import { AudioPlayer } from 'shared';


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
        url,
        // selectMode,
        // meta,
        // handlePlay,
        // handleStop,
        // handleMessageClick,
    } = props;

    React.useEffect(() => {
        firebaseSorage.load(url)
            .then(buffer => {
                const audioPlayer = new AudioPlayer(buffer);
                audioPlayer.init()
                    .then(() => {
                        audioPlayer.start()
                        console.log(audioPlayer.duration)
                    })
            })
    }, [url]);

    return (
        <div className="message-content-audio">
            <div className="audio-control">
                <button className="audio-control__btn" type="button" title="Play audio">
                    <span className="visually-hidden">Play audio</span>
                    <PlayIcon fontSize="large" />
                </button>
                <audio src={url} controls></audio>
                <div className="audio-control__content audio-control__content_unread">
                    <div className="audio-control__waveform"></div>
                    <div className="audio-control__duration">0:03</div>
                </div>
            </div>
        </div>
    )
};

export default MessageContentAudio;