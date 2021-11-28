import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
    selectUserData,
    selectActiveDialog,
    changeSelectModeAction,
    toggleSelectMessageAction,
    fetchDialogMessagesAction,
} from '../store';
import MessagesTrack from '../components/MessagesTrack/MessagesTrack';
import { Status, Loader } from 'shared';
import { IMessage } from '../models';


const MessagesTrackContainer: React.FC = React.memo(() => {

    const dispatch = useDispatch();

    const user = useSelector(selectUserData);
    const activeDialog = useSelector(selectActiveDialog);
    const status = activeDialog?.status || Status.Initial;
    const messagesList = activeDialog?.messages.list || [];
    const selectMode = activeDialog?.messages.selectMode || false;

    const enableSelectMode = React.useCallback(() => { !selectMode && dispatch(changeSelectModeAction({ payload: true })) }, [selectMode]);
    const disableSelectMode = React.useCallback(() => { selectMode && dispatch(changeSelectModeAction({ payload: false })) }, [selectMode]);
    const toggleSelectMessage = React.useCallback((message: IMessage) => { dispatch(toggleSelectMessageAction({ payload: message })) }, []);
    const handleFetchMessages = React.useCallback(() => {
        if(activeDialog && activeDialog.messages.hasMore){
            dispatch(fetchDialogMessagesAction({ payload: {
                dialogId: activeDialog.dialogId,
                page: activeDialog.page,
                limit: activeDialog.limit,
            } }));
        }
    }, [activeDialog]);
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.code === "Escape") disableSelectMode();
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
            list={messagesList}
            selectMode={selectMode}
            enableSelectMode={enableSelectMode}
            toggleSelectMessage={toggleSelectMessage}
            handleFetchMessages={handleFetchMessages}
        />
    );
});

export default MessagesTrackContainer;