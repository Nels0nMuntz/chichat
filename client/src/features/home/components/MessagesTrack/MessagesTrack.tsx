import React from 'react';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isThisWeek from 'date-fns/isThisWeek';
import isThisYear from 'date-fns/isThisYear';
import uk from 'date-fns/locale/uk';

import TextMessageItem from './Messages/TextMessageItem';
import { IMessage } from '../../models';
import { MessageDateGroup, Status } from 'shared';

import style from './MessagesTrack.module.scss';

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
    page: number;
    enableSelectMode: () => void;
    toggleSelectMessage: (message: IMessage) => void;
    handleFetchMessages: () => void;
    handleLoading: (status: Status) => void;
};

let curr = 0;

const MessagesTrack: React.FC<MessagesTrackProps> = React.memo((props) => {

    const [scroll, setScroll] = React.useState(false);
    const [scrollHeight, setScrollHeight] = React.useState(0);

    const [prevLoader, setPrevLoader] = React.useState<IntersectionObserverEntry | null>(null)

    const {
        status,
        list,
        userId,
        selectMode,
        // page,
        enableSelectMode,
        toggleSelectMessage,
        handleFetchMessages,
        // handleLoading,
    } = props;

    // const entryRef = React.useRef<HTMLDivElement>(null);

    // infinite scroll
    const loader = React.useRef<any>(null);

    // React.useEffect(() => {
    //     handleFetchMessages();
    // }, [list])

    React.useEffect(() => {
        const root = document.getElementById("messages_track");
        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0];
            if (entry.intersectionRatio > 0) {
                setScroll(true);
                // console.log({ entry, target: entry.target });
                // console.log(root?.scrollHeight);

                handleFetchMessages();


                if (root) {
                    console.log({ scrollHeight: root.scrollHeight, rect: entry.boundingClientRect });
                    setScrollHeight(root.scrollHeight)
    
                    // root.scrollTop = root.scrollHeight - entry.boundingClientRect.top;
                    // root.scrollTop = 800;
                };

                // setPrevLoader(entry);
            };

        };
        const options = {
            root,
            rootMargin: '10px',
            threshold: 1.0,
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        };
    }, [list, setScrollHeight]);

    // scroll to bottom
    React.useEffect(() => {
        const el = document.getElementById("messages_track");
        if (el && status !== Status.Success && !scroll) {
            console.log('scroll');
            el.scrollTop = el.scrollHeight;
        };
    }, [list, status, scroll]);

    React.useLayoutEffect(() => {
        const root = document.getElementById("messages_track");
        if (root){
            const diff = root.scrollHeight - scrollHeight;
            root.scrollTop = curr + diff + 40;
            curr = diff;
            // console.log(root.scrollHeight - scrollHeight);
            
        }
    }, [scrollHeight, list]);

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
    );
});

export default MessagesTrack;