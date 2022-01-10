import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    selectUserData,
    changeSelectModeAction,
    toggleSelectMessageAction,
    fetchDialogMessagesAction,
    setDialogMessagesStatusAction,
} from '../store';
import MessagesTrack from '../components/MessagesTrack/MessagesTrack';
import { Status } from 'shared';
import { IDialog, IMessage } from '../models';


type MessagesTrackContainerProps = {
    activeDialog: IDialog;
    containerEl: HTMLDivElement | null;
};

const MessagesTrackContainer: React.FC<MessagesTrackContainerProps> = ({ activeDialog, containerEl }) => {

    const dispatch = useDispatch();

    const user = useSelector(selectUserData);
    const dialogId = activeDialog.dialogId;
    const messagesStatus = activeDialog.messages.status;
    const selectMode = activeDialog.messages.selectMode;
    const messagesList = activeDialog.messages.list;
    const hasMore = activeDialog.messages.hasMore;
    const page = activeDialog.messages.page;
    const limit = activeDialog.messages.limit;

    const enableSelectMode = React.useCallback(() => { dispatch(changeSelectModeAction({ payload: true })) }, []);
    const disableSelectMode = React.useCallback(() => { dispatch(changeSelectModeAction({ payload: false })) }, []);
    const toggleSelectMessage = React.useCallback((message: IMessage) => { dispatch(toggleSelectMessageAction({ payload: message })) }, []);
    const handleFetchMessages = React.useCallback(() => {
        if (hasMore) {
            dispatch(fetchDialogMessagesAction({ payload: { dialogId, page, limit } }));
        };
    }, [hasMore, dialogId, page, limit]);
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.code === "Escape") disableSelectMode();
    };
    const handleLoading = React.useCallback((status: Status) => { dispatch(setDialogMessagesStatusAction({ payload: { dialogId, status } })) }, [dialogId]);

    React.useEffect(() => {
        if (selectMode) {
            window.document.body.addEventListener("keydown", handleKeydown);
        }
        return () => {
            window.document.body.removeEventListener("keydown", handleKeydown);
        }
    }, [selectMode]);

    return (
        <MessagesTrack
            status={messagesStatus}
            userId={user.userId}
            dialogId={dialogId}
            list={messagesList}
            selectMode={selectMode}
            page={page}
            enableSelectMode={enableSelectMode}
            toggleSelectMessage={toggleSelectMessage}
            handleFetchMessages={handleFetchMessages}
            handleLoading={handleLoading}
            containerEl={containerEl}
        />
    );
};

export default MessagesTrackContainer;