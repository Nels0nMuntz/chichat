import React from 'react';

import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { IMessageAttach } from 'features/home/models';
import { AudioPlayer, Status } from 'shared';


const DURATION_10_MINUTES = 600;
const DURATION_60_MINUTES = 3600;

type AudioPlayerState = 'inactive' | 'started' | 'stopped';

type AudioControl = {
    state: AudioPlayerState;
    // startedAt: number;
    // pausedAt: number;
};

type PlayerRunnerProps = {
    state: AudioPlayerState;
    duration: number,
};

type MessageContentAudioProps = {
    attach: IMessageAttach;
    onFetchAttach: (attach: IMessageAttach) => void;
};

const MessageContentAudio: React.FC<MessageContentAudioProps> = React.memo((props) => {

    const {
        attach,
        onFetchAttach
    } = props;

    const status = attach.file.status;
    const audioBuffer = attach.file.audioBuffer;

    return (
        <div className="message-item__content-item">
            <div className="audio-control">
                <button
                    className="audio-control__btn"
                    type="button"
                    title="Play audio"
                    // onClick={control.state === 'started' ? onPause : onStart}
                >
                    <span className="visually-hidden">Play audio</span>
                    {/* {control.state === 'started' ? (
                        <PauseIcon fontSize="large" />
                    ) : (
                        <PlayIcon fontSize="large" />
                    )} */}
                </button>
                <audio id='audio' src={attach.url} style={{ display: 'none' }}></audio>
                <div className="audio-control__content audio-control__content_unread">
                    <div className="audio-control__waveform"></div>
                    {/* {player && player.duration && (
                        <PlayerRunner
                            state={control.state}
                            duration={player.duration}
                        />
                    )} */}
                </div>
            </div>
        </div>
    )
});

const PlayerRunner: React.FC<PlayerRunnerProps> = ({ state, duration }) => {

    const [time, setTime] = React.useState<number>(0);
    
    const ended = time >= duration;

    React.useEffect(() => {
        let interval: NodeJS.Timer | null = null;

         if (state === 'started') {
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        } else {
            interval && clearInterval(interval);
        }
        return () => {
            interval && clearInterval(interval);
        };
    }, [state]);

    return (
        <div className="audio-control__duration">
            {/* <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
            <span>{("0" + ((time / 10) % 100)).slice(-2)}</span> */}
            {duration >= DURATION_60_MINUTES && (
                <span>{("0" + Math.floor((duration / 3600) % 60)).slice(-2)}:</span>
            )}
            <span>{(duration < DURATION_10_MINUTES ? '0' : '' + Math.floor((duration / 60) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((duration) % 60)).slice(-2)}</span>
            {(state !== 'inactive' || (!ended && !!time)) && (
                <React.Fragment>
                    {' / '}
                    {time >= DURATION_60_MINUTES && (
                        <span>{("0" + Math.floor((time / 3600) % 60)).slice(-2)}:</span>
                    )}
                    <span>{(time < DURATION_10_MINUTES ? '0' : '' + Math.floor((time / 60) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time) % 60)).slice(-2)}</span>
                </React.Fragment>
            )}
        </div>
    )
};

export default MessageContentAudio;