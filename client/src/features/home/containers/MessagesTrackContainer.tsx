import React from 'react';
import { useSelector } from 'react-redux';

import { selectMessagesState } from '../store/selectors';

import MessagesTrack from '../components/MessagesTrack/MessagesTrack';


const MessagesTrackContainer : React.FC = React.memo(() => {

    // const dispatch = useDispatch();

    const { status, list } = useSelector(selectMessagesState);

    return (
        <MessagesTrack
            status={status}
            list={list}
        />
    )
});

export default MessagesTrackContainer;