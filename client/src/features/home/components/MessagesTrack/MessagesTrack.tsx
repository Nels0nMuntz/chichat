import React from 'react';

import { IMessage } from '../../models';
import { MessageItem, MessageContentText, Status, Loader } from 'shared';

import style from './MessagesTrack.module.scss';


type MessagesTrackProps = {
    status: Status
    list: Array<IMessage>;
};

const MessagesTrack: React.FC<MessagesTrackProps> = React.memo(({ status, list }) => {

    // const [selectMode, setSelectMode] = React.useState(false);

    if(status === Status.Running) return <Loader/>;

    return (
        <div className={style.messages_track}>
            {list.map(({ messageId, content }) => (
                <MessageItem key={messageId}>
                    <MessageContentText meta="16:08">
                        {content.text}
                    </MessageContentText>
                </MessageItem>
            ))}
        </div>
    );
});

export default MessagesTrack;