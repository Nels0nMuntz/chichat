import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
    selectMessagesStatus, 
    selectSelectMode,
    selectUserData,
    selectDialogsList,
    selectActiveDialog,
    toggleSelectMessageAction,
    enableMessagesSelectModeAction,
    disableMessagesSelectModeAction,
} from '../store';
import MessagesTrack from '../components/MessagesTrack/MessagesTrack';
import { Status, Loader } from 'shared';
import { IMessage } from '../models';


const MessagesTrackContainer: React.FC = React.memo(() => {

    const dispatch = useDispatch();

    const status = useSelector(selectMessagesStatus);
    const selectMode = useSelector(selectSelectMode);
    const user = useSelector(selectUserData);
    const dialogs = useSelector(selectDialogsList);
    const activeDialogid = useSelector(selectActiveDialog);
    
    const messagesList = dialogs.find(({ dialogId }) => dialogId === activeDialogid)?.messages || [];

    const enableSelectMode = React.useCallback(() => { !selectMode && dispatch(enableMessagesSelectModeAction({ payload: null })) }, [selectMode]);
    const disableSelectMode = React.useCallback(() => { selectMode && dispatch(disableMessagesSelectModeAction({ payload: null })) }, [selectMode]);
    const toggleSelectMessage = React.useCallback((message: IMessage) => { dispatch(toggleSelectMessageAction({ payload: message })) }, []);
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.code === "Escape") disableSelectMode();
    };
    // const handleFetchMessages = React.useCallback()

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
            list={messagesList}
            selectMode={selectMode}
            enableSelectMode={enableSelectMode}
            toggleSelectMessage={toggleSelectMessage}
        />
    );
});

export default MessagesTrackContainer;