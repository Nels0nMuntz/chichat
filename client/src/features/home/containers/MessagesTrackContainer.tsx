import React from 'react';
import { useSelector } from 'react-redux';

import { selectMessagesState, selectUserData } from '../store/selectors';

import MessagesTrack from '../components/MessagesTrack/MessagesTrack';


const MessagesTrackContainer : React.FC = React.memo(() => {

    // const dispatch = useDispatch();

    const { status, list } = useSelector(selectMessagesState);
    const { userId } = useSelector(selectUserData);

    return (
        <MessagesTrack
            status={status}
            list={list}
            userId={userId}
        />
    )
});

export default MessagesTrackContainer;