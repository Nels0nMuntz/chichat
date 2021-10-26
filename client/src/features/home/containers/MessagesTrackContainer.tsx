import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
    selectMessagesState, 
    selectSelectMode,
    selectUserData,
    toggleSelectMessageAction,
    enableMessagesSelectModeAction,
    disableMessagesSelectModeAction,
} from '../store';
import MessagesTrack from '../components/MessagesTrack/MessagesTrack';
import { Status, Loader } from 'shared';
import { IMessage } from '../models';


const MessagesTrackContainer: React.FC = () => {

    const dispatch = useDispatch();

    const { status, list } = useSelector(selectMessagesState);
    const selectMode = useSelector(selectSelectMode);
    const user = useSelector(selectUserData);

    const enableSelectMode = React.useCallback(() => { !selectMode && dispatch(enableMessagesSelectModeAction({ payload: null })) }, [selectMode]);
    const disableSelectMode = React.useCallback(() => { selectMode && dispatch(disableMessagesSelectModeAction({ payload: null })) }, [selectMode]);
    const toggleSelectMessage = React.useCallback((message: IMessage) => { dispatch(toggleSelectMessageAction({ payload: message })) }, []);
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.code === "Escape") {
            disableSelectMode();
        }
    };

    React.useEffect(() => {
        if (selectMode) {
            window.document.body.addEventListener("keydown", handleKeydown);
        }
        return () => {
            window.document.body.removeEventListener("keydown", handleKeydown);
        }
    }, [selectMode]);

    if (status === Status.Running) return <Loader />;

    return (
        <MessagesTrack
            status={status}
            userId={user.userId}
            list={list}
            selectMode={selectMode}
            enableSelectMode={enableSelectMode}
            toggleSelectMessage={toggleSelectMessage}
        />
    )
};

export default MessagesTrackContainer;