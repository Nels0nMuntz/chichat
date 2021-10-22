import React from 'react';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isThisWeek from 'date-fns/isThisWeek';
import isThisYear from 'date-fns/isThisYear';
import uk from 'date-fns/locale/uk'

import { IMessage } from '../../models';
import {
    MessageDateGroup,
    MessageItem,
    MessageContentText,
    Status,
    Loader,
} from 'shared';

import style from './MessagesTrack.module.scss';

const formatPeriod = (date: Date): string => {
    if (isThisWeek(date, { locale: uk })) return format(date, "EEEE");
    if (isThisYear(date)) return format(date, "MMMM d");
    return format(date, "MMMM d, yyyy");
};

const formatTime = (date: Date): string => {
    return format(new Date(date), "HH:mm");
};

interface IGroupedMessages {
    period: Date;
    list: Array<IMessage>;
};

type MessagesTrackProps = {
    status: Status
    list: Array<IMessage>;
    userId: string;
};

const MessagesTrack: React.FC<MessagesTrackProps> = React.memo(({ status, list, userId }) => {

    // const [selectMode, setSelectMode] = React.useState(false);

    const messages: Array<IGroupedMessages> = React.useMemo(() => {
        return list.reduce((prev, curr) => {
            if (!prev.length) {
                return [{
                    period: new Date(curr.createdAt),
                    list: [curr]
                }]
            } else {
                const lastElem = prev[prev.length - 1];
                if (isSameDay(new Date(curr.createdAt), new Date(lastElem.period))) {
                    return [
                        ...prev.slice(0, prev.length - 1),
                        {
                            ...lastElem,
                            list: [
                                curr,
                                ...lastElem.list,
                            ]
                        }
                    ]
                } else {
                    return [
                        ...prev,
                        {
                            period: new Date(curr.createdAt),
                            list: [curr]
                        }
                    ]
                }
            }
        }, [] as Array<IGroupedMessages>);
    }, [list]);

    if (status === Status.Running) return <Loader />;

    return (
        <div className={style.messages_track}>
            {messages.map(({ period, list }) => (
                <MessageDateGroup
                    key={+period}
                    period={formatPeriod(period)}
                >
                    {list.map(({ messageId, content, createdBy, createdAt }) => (
                        <MessageItem
                            isOwn={createdBy === userId}
                            key={messageId}
                        >
                            <MessageContentText meta={formatTime(new Date(createdAt))}>
                                {content.text}
                            </MessageContentText>
                        </MessageItem>
                    ))}
                </MessageDateGroup>
            ))}
        </div>
    );
});

export default MessagesTrack;