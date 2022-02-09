import React from 'react';
import { useDispatch } from 'react-redux';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import { IMessageAttach } from 'features/home/models';
import { setMessageAttachPlayingAction } from 'features/home/store/dialogs/actions';
import { Status, UniqueId } from 'shared';


const getTimeString = (time: number | null | undefined) => {
    if (!time && time !== 0) return '';
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
    const canPlay = attach.file.playing;
    const buffer = attach.file.buffer;
    // const duration = attach.file.duration;
    // const analyser = attach.file.analyser;
    // const audioContext = attach.file.audioContext;

    const dispatch = useDispatch();

    const audioRef = React.useRef(new Audio(attach.url));
    const intervalRef = React.useRef<NodeJS.Timer | null>(null);
    const frequencyElRef = React.useRef<HTMLCanvasElement | null>(null)
    // const sinewaveElRef = React.useRef<HTMLCanvasElement | null>(null)

    const [playing, setPlaying] = React.useState<boolean>(false);
    const [duration, setDuration] = React.useState<number>(0);
    const [trackProgress, setTrackProgress] = React.useState<number>(0);

    const startTimer = () => {
        intervalRef.current && clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                setPlaying(false);
                setTrackProgress(0);
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
        if (!canPlay) {
            dispatch(setMessageAttachPlayingAction({ payload: { messageId, attachId: attach.attachId } }));
        };
        setPlaying(true);
    };
    const stopPlaying = () => setPlaying(false);

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
        }
    }, [playing, audioRef, startTimer]);
    React.useEffect(() => {
        if (!canPlay) {
            setPlaying(false);
            audioRef.current.currentTime = 0;
            setTrackProgress(audioRef.current.currentTime);
        };
    }, [canPlay]);
    // React.useEffect(() => {
    //     if (analyser && frequencyElRef.current && sinewaveElRef.current) {
    //         console.log('drawFrequency call');
    //         analyser.fftSize = 2048;
    //         drawFrequency(analyser, frequencyElRef.current);
    //         drawSinewave(analyser, sinewaveElRef.current);
    //     };
    // }, [analyser, frequencyElRef.current, sinewaveElRef.current]);
    React.useEffect(() => {
        console.log({
            status,
            buffer,
            audioRef: audioRef.current,
            frequencyElRef: frequencyElRef.current,
        });
        
        if(status === Status.Success && buffer && audioRef.current && frequencyElRef.current) {
            const frequencyEl = frequencyElRef.current;
            // @ts-ignore
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // audioContext.decodeAudioData(buffer).then(audioBuffer => setDuration(audioBuffer.duration));

            const gainNode = audioContext.createGain();
            const analyser = audioContext.createAnalyser();
            // analyser.connect(audioContext.destination);
            
            const source = audioContext.createMediaElementSource(audioRef.current);
            // source.connect(analyser);
            source
                .connect(gainNode)
                .connect(analyser)
                .connect(audioContext.destination);

            analyser.fftSize = 2048;
            const bufferLength = analyser.frequencyBinCount;
            const frequencyArray = new Uint8Array(bufferLength);

            const frequencyElWidth = frequencyEl.width;
            const frequencyElHeight = frequencyEl.height;
            const canvasContext = frequencyEl.getContext('2d');
            
            if(!canvasContext) {
                console.log('canvasContext does not exist');                
                return;
            };
            canvasContext.clearRect(0, 0, frequencyElWidth, frequencyElHeight);

            const draw = () => {
                console.log('draw');
                if(!canvasContext) {
                    console.log('canvasContext does not exist');                
                    return;
                };

                const drawVisual = requestAnimationFrame(draw);
                
            
                analyser.getByteFrequencyData(frequencyArray);                

                canvasContext.fillStyle = 'rgb(250, 250, 250)';
                canvasContext.fillRect(0, 0, frequencyElWidth, frequencyElHeight);

                let barWidth = (frequencyElWidth / bufferLength) * 2.5 -1;
                let barHeright;
                let x = 0;

                for(let i = 0; i < bufferLength; i++) {
                    barHeright = frequencyArray[i];
                    canvasContext.fillStyle = `rgb(${barHeright + 100}, 50, 50)`;
                    canvasContext.fillRect(x, frequencyElHeight - barHeright / 2, barWidth, barHeright / 2);
                    x += barWidth;
                }
            }
            draw();
        };
    }, [status, buffer, audioRef.current, frequencyElRef.current]);

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
            <div className="audio-player__visualization">
                <canvas ref={frequencyElRef} className="audio-player__frequency" width="500" height="200"></canvas>
                {/* <canvas ref={sinewaveElRef} className="audio-player__sinewave" width="1024" height="100"></canvas> */}
            </div>
        </div>
    );
};



const styles = {
    fillStyle: 'rgb(250, 250, 250)', // background
    strokeStyle: 'rgb(251, 89, 17)', // line color
    lineWidth: 1,
    fftSize: 16384 // delization of bars from 1024 to 32768
}

function drawFrequency(analyser: AnalyserNode, canvasEl: HTMLCanvasElement) {

    if (!canvasEl) return;

    const frequencyСanvasCtx = canvasEl.getContext("2d");
    if (!frequencyСanvasCtx) return;
    frequencyСanvasCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    let frequencyDataArray = new Uint8Array(analyser.fftSize);
    console.log(frequencyDataArray);
    analyser.getByteFrequencyData(frequencyDataArray);
    console.log(frequencyDataArray);
    // @ts-ignore
    requestAnimationFrame(drawFrequency);

    frequencyСanvasCtx.fillStyle = styles.fillStyle;
    frequencyСanvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    frequencyСanvasCtx.beginPath();

    const barWidth = (canvasEl.width / analyser.frequencyBinCount) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < analyser.frequencyBinCount; i++) {
        barHeight = frequencyDataArray[i];
        // console.log(barHeight);


        frequencyСanvasCtx.fillStyle = styles.strokeStyle;
        frequencyСanvasCtx.fillRect(x, canvasEl.height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
    }
};

function drawSinewave(analyser: AnalyserNode, canvasEl: HTMLCanvasElement) {

    if (!canvasEl) return;

    const sinewaveСanvasCtx = canvasEl.getContext("2d");
    if (!sinewaveСanvasCtx) return;
    sinewaveСanvasCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    let sinewaveDataArray = new Uint8Array(analyser.fftSize);
    // console.log(sinewaveDataArray);
    analyser.getByteTimeDomainData(sinewaveDataArray);
    // console.log(sinewaveDataArray);
    // @ts-ignore
    requestAnimationFrame(drawSinewave);

    sinewaveСanvasCtx.fillStyle = styles.fillStyle;
    sinewaveСanvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    sinewaveСanvasCtx.lineWidth = styles.lineWidth;
    sinewaveСanvasCtx.strokeStyle = styles.strokeStyle;
    sinewaveСanvasCtx.beginPath();

    const sliceWidth = canvasEl.width * 1.0 / analyser.fftSize;
    let x = 0;

    for (let i = 0; i < analyser.fftSize; i++) {
        // console.log(sinewaveDataArray[i]);

        const v = sinewaveDataArray[i] / 128.0; // byte / 2 || 256 / 2
        const y = v * canvasEl.height / 2;

        if (i === 0) {
            sinewaveСanvasCtx.moveTo(x, y);
        } else {
            sinewaveСanvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
    }

    sinewaveСanvasCtx.lineTo(canvasEl.width, canvasEl.height / 2);
    sinewaveСanvasCtx.stroke();
};



function renderFrame(analyser: AnalyserNode, canvasEl: HTMLCanvasElement) {
    // @ts-ignore
    requestAnimationFrame(renderFrame);

    if(!canvasEl) return;

    const ctx = canvasEl.getContext('2d');
    if(!ctx) return;
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    const bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    let x = 0;
    let barWidth = (canvasEl.width / bufferLength) * 2.5;
    let barHeight;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        console.log(barHeight);

        var r = barHeight + (25 * (i / bufferLength));
        var g = 250 * (i / bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, canvasEl.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}