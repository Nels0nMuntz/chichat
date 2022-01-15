import React from 'react';
import classNames from 'classnames';

import { RecordState } from 'features/home/models';

import style from './RecordRunner.module.scss';



type RecordRunnerProps = {
    recordState: RecordState;
};

const RecordRunner: React.FC<RecordRunnerProps> = ({ recordState }) => {

    const [time, setTime] = React.useState(0);

    React.useEffect(() => {
        let interval: NodeJS.Timer | null = null;

        if (recordState === 'recording') {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            interval && clearInterval(interval);
        }
        return () => {
            interval && clearInterval(interval);
        };
    }, [recordState]);

    return (
        <div className={classNames(
            style.runner,
            recordState === 'paused' && style.paused
        )}>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
            <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
    );
};

export default RecordRunner;


