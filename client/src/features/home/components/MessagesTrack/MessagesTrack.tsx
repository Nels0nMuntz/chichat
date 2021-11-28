import React from 'react';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isThisWeek from 'date-fns/isThisWeek';
import isThisYear from 'date-fns/isThisYear';
import uk from 'date-fns/locale/uk';
import SimpleBar from 'simplebar-react';

import TextMessageItem from './Messages/TextMessageItem';
import { IMessage } from '../../models';
import { MessageDateGroup, Status } from 'shared';

import style from './MessagesTrack.module.scss';
import 'simplebar/dist/simplebar.min.css';

const formatPeriod = (date: Date): string => {
    if (isThisWeek(date, { locale: uk })) return format(date, "EEEE");
    if (isThisYear(date)) return format(date, "MMMM d");
    return format(date, "MMMM d, yyyy");
};

interface IGroupedMessages {
    period: Date;
    list: Array<IMessage>;
};

type MessagesTrackProps = {
    status: Status;
    userId: string;
    list: Array<IMessage>;
    selectMode: boolean;
    enableSelectMode: () => void;
    toggleSelectMessage: (message: IMessage) => void;
    handleFetchMessages: () => void;
};

const MessagesTrack: React.FC<MessagesTrackProps> = React.memo(({ list, userId, selectMode, enableSelectMode, toggleSelectMessage, handleFetchMessages }) => {

    // infinite scroll
    const loader = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting) {
                console.log("Intersecting");
                handleFetchMessages();
            };
        };
        const options = {
            root: document.querySelector(".simplebar-content-wrapper"),
            rootMargin: '100px',
            threshold: 1.0,
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }
    }, []);

    // scroll to bottom
    React.useEffect(() => {
        const el = document.querySelector(".simplebar-content-wrapper");
        if (el) el.scrollTop = el.scrollHeight;
    }, [list]);

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
        <SimpleBar style={{ height: 'inherit' }} >
            <div className={style.messages_track}>
                {messages.map(({ period, list }, groupIndex) => (
                    <MessageDateGroup
                        key={groupIndex}
                        period={formatPeriod(period)}
                    >
                        {list.map((message, messageIndex) => {                            
                            if (messages.length === groupIndex + 1 && messageIndex === 0) return (
                                <div key={message.messageId} ref={loader} className="last-item">
                                    <TextMessageItem
                                        userId={userId}
                                        message={message}
                                        selectMode={selectMode}
                                        enableSelectMode={enableSelectMode}
                                        toggleSelectMessage={toggleSelectMessage}
                                    />
                                </div>
                            )
                            return (
                                <TextMessageItem
                                    key={message.messageId}
                                    userId={userId}
                                    message={message}
                                    selectMode={selectMode}
                                    enableSelectMode={enableSelectMode}
                                    toggleSelectMessage={toggleSelectMessage}
                                />
                            )
                        })}
                    </MessageDateGroup>
                ))}
            </div>
        </SimpleBar>
    );
});

export default MessagesTrack;