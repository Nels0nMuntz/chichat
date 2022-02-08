import React from 'react';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import { IMessageAttach } from 'features/home/models';
import { setMessageAttachPlayingAction } from 'features/home/store/dialogs/actions';
import { Status, UniqueId } from 'shared';
import { useDispatch } from 'react-redux';


const getTimeString = (time: number | null | undefined) => {
    if(!time && time !== 0) return '';
    const secs = ('0' + Math.round(time % 60)).slice(-2);
    const min = parseInt(`${(time / 60) % 60}`, 10);
    return `${min}:${secs}`;
};

type MessageContentVoiceProps = {
    messageId: UniqueId;
    attach: IMessageAttach;
    onFetchAttach: (attach: IMessageAttach) => void;
};

export const MessageContentVoice: React.FC<MessageContentVoiceProps> = (props) => {

    const {
        messageId,
        attach,
        onFetchAttach
    } = props;

    const status = attach.file.status;
    const buffer = attach.file.buffer;
    const canPlay = attach.file.playing;

    const dispatch = useDispatch();

    const audioRef = React.useRef(new Audio(attach.url));
    const intervalRef = React.useRef<NodeJS.Timer | null>(null);

    const [playing, setPlaying] = React.useState<boolean>(false);
    const [duration, setDuration] = React.useState<number | null>(null);
    const [trackProgress, setTrackProgress] = React.useState<number>(0);

    const startTimer = () => {
        intervalRef.current && clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {            
            if(audioRef.current.ended) {
                setPlaying(false);
                setTrackProgress(0)
            } else {
                setTrackProgress(audioRef.current.currentTime);
            };
        }, 10);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        intervalRef.current && clearInterval(intervalRef.current);      
        audioRef.current.currentTime = +e.target.value;
        startTimer();
    };
    const startPlaying = () => {
        if(!canPlay) {
            dispatch(setMessageAttachPlayingAction({ payload: { messageId, attachId: attach.attachId } }));
        } else {
            setPlaying(true);
        }
    };
    const stopPlaying = () => setPlaying(false);

    React.useEffect(() => {
        if (status === Status.Initial) {
            onFetchAttach(attach);
        };
    }, [attach]);
    React.useEffect(() => {
        if (status === Status.Success && !!buffer && duration === null) {
            const audioContext = new AudioContext();
            audioContext.decodeAudioData(buffer)
                .then(audioBuffer => {
                    const duration = Math.round(audioBuffer.duration);
                    setDuration(duration);
                });
        };
    }, [status, buffer, duration]);
    React.useEffect(() => {
        if (playing) {
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
        }
    }, [playing, audioRef, startTimer]);    

    return (
        <div className='message-item__content-item audio-player'>
            {/* <audio className='audio-player__audio-el' ref={audioRef}></audio> */}
            {playing ? (
                <button
                    className="audio-player__btn"
                    type="button"
                    title="Pause audio"
                    aria-label='Pause audio'
                    onClick={stopPlaying}
                >
                    <PauseIcon fontSize="large" />
                </button>
            ) : (
                <button
                    className="audio-player__btn"
                    type="button"
                    title="Play audio"
                    aria-label='Play audio'
                    onClick={startPlaying}
                >
                    <PlayIcon fontSize="large" />
                </button>
            )}
            <div className="audio-player__progress">
                <input
                    className='audio-player__progress-slider'
                    type="range"
                    step={0.01}
                    min={0}
                    max={duration || undefined}
                    value={trackProgress}
                    onChange={handleChange}
                    onMouseDown={stopPlaying}
                    onMouseUp={startPlaying}
                />
                <div className="audio-player__current-time">{getTimeString(audioRef.current.currentTime)}</div>
                <div className="audio-player__duration">{' / ' + getTimeString(duration)}</div>
            </div>
        </div>
    );
};