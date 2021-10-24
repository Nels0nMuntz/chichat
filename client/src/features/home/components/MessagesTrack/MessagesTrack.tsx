import React from 'react';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isThisWeek from 'date-fns/isThisWeek';
import isThisYear from 'date-fns/isThisYear';
import uk from 'date-fns/locale/uk';
import SimpleBar from 'simplebar-react';

import { IMessage } from '../../models';
import {
    MessageDateGroup,
    MessageItem,
    MessageContentText,
    Status,
} from 'shared';

import style from './MessagesTrack.module.scss';
import 'simplebar/dist/simplebar.min.css';

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

const MessagesTrack: React.FC<MessagesTrackProps> = React.memo(({ list, userId }) => {

    const scrollRef = React.useRef<SimpleBar>(null);

    React.useEffect(() => {
        if(scrollRef && scrollRef.current) {;
            const scrollHeight = scrollRef.current.el.scrollHeight;
            const el = document.querySelector(".simplebar-content-wrapper");
            if(el){
                console.log(el.scrollTop = scrollHeight)
                console.log(el.scrollTop);  
            };           
        }
    }, [scrollRef]);

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

    return (
        <SimpleBar style={{ height: 'inherit' }} ref={scrollRef} forceVisible={true} >
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
        </SimpleBar>
    );
});

export default MessagesTrack;