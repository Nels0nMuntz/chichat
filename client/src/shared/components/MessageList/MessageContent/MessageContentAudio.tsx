import React from 'react';

import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { IMessageAttach } from 'features/home/models';
import { AudioPlayer, Status } from 'shared';


type AudioControl = {
    state: 'inactive' | 'started' | 'stopped';
    startedAt: number;
    pausedAt: number;
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
    const audioBuffer = attach.file.buffer;

    const [player, setPlayer] = React.useState<AudioPlayer | null>(null)
    const [control, setControl] = React.useState<AudioControl>({
        state: 'inactive',
        startedAt: 0,
        pausedAt: 0,
    });

    React.useEffect(() => {
        if(status === Status.Initial) {
            onFetchAttach(attach);
        };
    }, [attach]);
    React.useEffect(() => {
        if(status === Status.Success && audioBuffer && !player){
            AudioPlayer.create(audioBuffer).then(player => setPlayer(player));
        }
    }, [player, status, attach]);

    const onStart = () => {
        player?.start(0, control.pausedAt);
        setControl(prev => ({
            ...prev,
            state: 'started',
            startedAt: Date.now(),
        }));
    };
    const onPause = () => {
        player?.stop();
        setControl(prev => ({
            ...prev,
            state: 'stopped',
            pausedAt: Date.now() - prev.startedAt,
        }));
    };


    return (
        <div className="message-item__content-item">
            <div className="audio-control">
                <button 
                    className="audio-control__btn" 
                    type="button" 
                    title="Play audio"
                    onClick={control.state === 'started' ? onPause : onStart}
                >
                    <span className="visually-hidden">Play audio</span>
                    {control.state === 'started' ? (
                        <PauseIcon fontSize="large"/>
                    ) : (
                        <PlayIcon fontSize="large"/>
                    )}
                </button>
                <div className="audio-control__content audio-control__content_unread">
                    <div className="audio-control__waveform"></div>
                    {player && (
                        <div className="audio-control__duration">{player.duration}</div>
                    )}
                </div>
            </div>
        </div>
    )
});

export default MessageContentAudio;