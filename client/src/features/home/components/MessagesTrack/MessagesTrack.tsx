import React from 'react';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isThisWeek from 'date-fns/isThisWeek';
import isThisYear from 'date-fns/isThisYear';
import uk from 'date-fns/locale/uk';

import TextMessageItem from './Messages/TextMessageItem';
import { IMessage } from '../../models';
import { MessageDateGroup, Status, UniqueId } from 'shared';

import style from './MessagesTrack.module.scss';

const formatPeriod = (date: Date): string => {
    if (isThisWeek(date, { locale: uk })) return format(date, "EEEE");
    if (isThisYear(date)) return format(date, "MMMM d");
    return format(date, "MMMM d, yyyy");
};

const scrollToBottom = () => {
    const el = document.getElementById("messages_track");
    if (el) {
        el.scrollTop = el.scrollHeight;
    };
};

interface IGroupedMessages {
    period: Date;
    list: Array<IMessage>;
};

type MessagesTrackProps = {
    status: Status;
    userId: UniqueId;
    dialogId: UniqueId;
    list: Array<IMessage>;
    selectMode: boolean;
    page: number;
    enableSelectMode: () => void;
    toggleSelectMessage: (message: IMessage) => void;
    handleFetchMessages: () => void;
    handleLoading: (status: Status) => void;
};

const MessagesTrack: React.FC<MessagesTrackProps> = React.memo((props) => {

    const [hasScrollToBottom, setHasScrollToBottom] = React.useState(true);

    const {
        status,
        list,
        userId,
        dialogId,
        selectMode,
        // page,
        enableSelectMode,
        toggleSelectMessage,
        handleFetchMessages,
        // handleLoading,
    } = props; 

    const loader = React.useRef<any>(null);

    React.useEffect(() => {
        const root = document.getElementById("messages_track");
        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0];
            console.log(entry.intersectionRatio);

            if (entry.isIntersecting) {
                setHasScrollToBottom(false);
                handleFetchMessages();
            };

        };
        const options = {
            root,
            rootMargin: '100px',
            threshold: 0,
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        };
    }, [list]);

    // scroll to bottom
    React.useEffect(() => {
        if (status !== Status.Success && hasScrollToBottom) {
            scrollToBottom();
        };
    }, [list, status, hasScrollToBottom, scrollToBottom]);

    React.useEffect(() => {
        scrollToBottom();
    }, [dialogId, scrollToBottom]);

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
        <div className={style.messages_track}>
            {messages
                .map(({ period, list }, groupIndex) => (
                    <MessageDateGroup
                        key={groupIndex}
                        period={formatPeriod(period)}
                    >
                        {list.map((message, messageIndex) => {
                            if (messages.length === groupIndex + 1 && messageIndex === 0) return (
                                <React.Fragment>
                                    <div className="trigger" style={{ width: '100%', height: '100px' }}></div>
                                    <div key={message.messageId} ref={loader} className="last-item">
                                        <TextMessageItem
                                            userId={userId}
                                            message={message}
                                            selectMode={selectMode}
                                            enableSelectMode={enableSelectMode}
                                            toggleSelectMessage={toggleSelectMessage}
                                        />
                                    </div>
                                </React.Fragment>
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
                ))
                .reverse()
            }
        </div>
    );
});

export default MessagesTrack;