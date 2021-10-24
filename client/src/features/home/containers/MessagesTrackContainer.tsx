import React from 'react';
import { useSelector } from 'react-redux';

import { selectMessagesState, selectUserData } from '../store/selectors';
import MessagesTrack from '../components/MessagesTrack/MessagesTrack';
import { Status, Loader } from 'shared';


const MessagesTrackContainer : React.FC = React.memo(() => {

    // const dispatch = useDispatch();

    const { status, list } = useSelector(selectMessagesState);
    const { userId } = useSelector(selectUserData);

    if (status === Status.Running) return <Loader />;

    return (
        <MessagesTrack
            status={status}
            list={list}
            userId={userId}
        />
    )
});

export default MessagesTrackContainer;