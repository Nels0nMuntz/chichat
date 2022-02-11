import React from 'react';
import { useDispatch } from 'react-redux';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import CircularProgress from '@material-ui/core/CircularProgress';

import { IMessageAttach, IMessageAttachVoiceFile } from 'features/home/models';
import { setMessageAttachPlayingAction } from 'features/home/store/dialogs/actions';
import { Status, UniqueId, ThemeContext, AppTheme } from 'shared';


const getTimeString = (time: number | null | undefined) => {
    if (!time && time !== 0) return '';
    const secs = ('0' + Math.round(time % 60)).slice(-2);
    const min = parseInt(`${(time / 60) % 60}`, 10);
    return `${min}:${secs}`;
};

type MessageContentVoiceProps = {
    messageId: UniqueId;
    attach: IMessageAttach<IMessageAttachVoiceFile>;
    onFetchAttach: (attach: IMessageAttach<IMessageAttachVoiceFile>) => void;
};

export const MessageContentVoice: React.FC<MessageContentVoiceProps> = (props) => {

    const {
        messageId,
        attach,
        onFetchAttach
    } = props;

    const { theme } = React.useContext(ThemeContext);

    const status = attach.status;
    const canPlay = attach.file.playing;
    const url = attach.file.urlFromBlob;
    const audioBuffer = attach.file.audioBuffer;
    const audioContext = attach.file.audioContext;
    const loading = status === Status.Initial || status === Status.Running; 

    const dispatch = useDispatch();

    const audioRef = React.useRef<HTMLAudioElement>(new Audio(url));
    const intervalRef = React.useRef<NodeJS.Timer | null>(null);
    const waveformElRef = React.useRef<HTMLCanvasElement | null>(null);

    const [playing, setPlaying] = React.useState<boolean>(false);
    const [trackProgress, setTrackProgress] = React.useState<number>(0);
    // const [duration, setDuration] = React.useState<number>(0);

    const startTimer = () => {
        intervalRef.current && clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setTrackProgress(audioRef.current.currentTime);
        }, 10);
    };

    const stopTimer = () => {
        intervalRef.current && clearInterval(intervalRef.current);
        audioRef.current.currentTime = 0;
        setTrackProgress(audioRef.current.currentTime); 
        setPlaying(false);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        intervalRef.current && clearInterval(intervalRef.current);
        audioRef.current.currentTime = +e.target.value;
        startTimer();
    };
    const startPlaying = () => {
        if (!canPlay) {
            dispatch(setMessageAttachPlayingAction({ payload: { messageId, attachId: attach.attachId } }));
        };
        setPlaying(true);
    };
    const stopPlaying = () => setPlaying(false);   

    audioRef.current.addEventListener("ended", () => {        
        stopTimer();
    });

    React.useEffect(() => {
        if (status === Status.Initial) {
            onFetchAttach(attach);
        };
    }, [attach]);
    React.useEffect(() => {
        if (playing) {
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
            stopTimer();
        }
    }, [playing, audioRef, startTimer]);
    React.useEffect(() => {
        if (!canPlay) {
            setPlaying(false);
            audioRef.current.currentTime = 0;
            setTrackProgress(audioRef.current.currentTime);
        };
    }, [canPlay]);
    React.useEffect(() => {
        if (url) {
            audioRef.current.src = url;
            audioRef.current.load();
        };
    }, [audioRef, url]);
    React.useEffect(() => {
        if (
            status === Status.Success
            && audioBuffer
            && audioContext
            && audioRef.current
            && waveformElRef.current
        ) {
            const canvasEl = waveformElRef.current;
            const canvasContext = getCanvasContext(canvasEl);
            if (!canvasContext) return;
            const filteredData = filterBuffer(audioBuffer);
            const normalizedData = normalizeData(filteredData);
            const segmentWidth = canvasEl.width / normalizedData.length;
            const startOffset = segmentWidth / 4;
            const strokeStyle = theme === AppTheme.Light ? '#3390EC' : '#FFF';

            for (let i = 0; i < normalizedData.length; i++) {
                const x = segmentWidth * i + startOffset;
                const minHeight = canvasEl.offsetHeight / 100 * 7;
                let height = normalizedData[i] * canvasEl.offsetHeight;
                if (height < 0 || height < minHeight) {
                    height = minHeight;
                } else if (height > canvasEl.offsetHeight) {
                    height = canvasEl.offsetHeight;
                };
                drawLineSegment(canvasContext, x, height, segmentWidth / 2, strokeStyle)
            };
        };
    }, [
        theme,
        status,
        audioBuffer,
        audioContext,
        audioRef.current,
        waveformElRef.current
    ]);

    return (
        <div className='message-item__content-item audio-player'>
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
                {loading && (
                    <div className='audio-player__loader'>
                        <CircularProgress size={25} color='inherit' />
                    </div>                    
                )}
                {audioBuffer && (
                    <React.Fragment>
                        <div className="audio-player__visualization">
                            <input
                                className='audio-player__progress-slider'
                                type="range"
                                step={0.01}
                                min={0}
                                max={audioBuffer?.duration}
                                value={trackProgress}
                                onChange={handleChange}
                                onMouseDown={stopPlaying}
                                onMouseUp={startPlaying}
                            />
                            <canvas ref={waveformElRef} width="200" height="23"></canvas>
                            <div
                                className='audio-player__backdrop'
                                style={{ width: trackProgress / audioBuffer.duration * 100 + '%' }}
                            />
                        </div>
                        <div className="audio-player__meta">
                            <span className="audio-player__current-time">{getTimeString(audioRef.current.currentTime)}</span>
                            <span className="audio-player__duration">{' / ' + getTimeString(audioBuffer.duration)}</span>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div >
    );
};

const filterBuffer = (audioBuffer: AudioBuffer) => {
    const rowData = audioBuffer.getChannelData(0);
    const samples = 40;
    const blockSize = Math.floor(rowData.length / samples);
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
            sum = sum + Math.abs(rowData[blockStart + j])
        };
        filteredData.push(sum / blockSize);
    };
    return filteredData;
};

const normalizeData = (filteredData: Array<number>) => {
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map(elem => elem * multiplier);
};

const getCanvasContext = (canvasEl: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio || 1;
    // const padding = 20;
    canvasEl.width = canvasEl.offsetWidth * dpr;
    canvasEl.height = canvasEl.offsetHeight * dpr;
    const context = canvasEl.getContext('2d');
    if (!context) return null;
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    context.scale(dpr, dpr);
    context.translate(0, canvasEl.offsetHeight);
    return context;
};

const drawLineSegment = (context: CanvasRenderingContext2D, x: number, y: number, width: number, strokeStyle: string) => {
    context.globalAlpha = 0.5;
    context.lineWidth = width;
    context.strokeStyle = strokeStyle;
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, y * -1);
    context.stroke();
};