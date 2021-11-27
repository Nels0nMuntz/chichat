import React from 'react';
import { BaseEmoji } from 'emoji-mart';
import { useDispatch, useSelector } from 'react-redux';

import MessageInput from '../components/MessageInput/MessageInput';
import {
    selectActiveDialog,
    selectUserData,
    sendWSMessageAction,
    setMessageTextAction,
    resetMessageTextAction,
    changeSelectModeAction,
} from '../store';
import { isEmptyString, wsManager } from 'shared';


const MessageInputContainer: React.FC = React.memo(() => {

    const dispatch = useDispatch();

    const [popups, setPopups] = React.useState({
        emoji: false,
        menu: false,
    });

    const user = useSelector(selectUserData);
    const activeDialog = useSelector(selectActiveDialog);
    const dialogId = activeDialog?.dialogId;
    const messageText = activeDialog?.form.text || '';
    const selectMode = activeDialog?.messages.selectMode || false;
    const selectedMessages = activeDialog?.messages.list.filter(({ selected }) => selected) || [];

    const handleValueChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(dialogId){
            dispatch(setMessageTextAction({ payload: e.target.value }));
        };
    }, [dialogId]);
    const handleOpenEmojiPopup = React.useCallback(() => setPopups({ emoji: true, menu: false }), []);
    const handleCloseEmojiPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);
    const handleOpenMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: true }), []);
    const handleCloseMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);
    const handleSendTextMessage = React.useCallback(() => {
        if(dialogId && !isEmptyString(messageText)) {
            const message = wsManager.createTextMessage(dialogId, user.userId, messageText)
            dispatch(sendWSMessageAction({ payload: message }));
            dispatch(resetMessageTextAction({ payload: null }));
        };
        
    }, [dialogId, messageText, user, wsManager]);
    const handleSelectEmoji = React.useCallback((emoji: BaseEmoji) => { dispatch(setMessageTextAction({ payload: emoji.native })); }, []);
    const disableSelectMode = React.useCallback(() => { selectMode && dispatch(changeSelectModeAction({ payload: false })) }, [selectMode]);
    const handleDeleteMessages = React.useCallback(() => {
        console.log('Deleting message will go here');        
        // dispatch(deleteMessagesInDBAction({ payload: selectedMessages.map(msg => msg.messageId) }));
        // dispatch(disableMessagesSelectModeAction({ payload: null }));
    }, []);

    if(!selectedMessages.length) disableSelectMode();

    if(!activeDialog) return null;

    return (
        <MessageInput
            value={messageText}
            menuPopup={popups.menu}
            emojiPopup={popups.emoji}
            selectedMessages={selectedMessages.length}
            selectMode={selectMode}
            handleValueChange={handleValueChange}
            handleOpenEmojiPopup={handleOpenEmojiPopup}
            handleCloseEmojiPopup={handleCloseEmojiPopup}
            handleOpenMenuPopup={handleOpenMenuPopup}
            handleCloseMenuPopup={handleCloseMenuPopup}
            handleSendTextMessage={handleSendTextMessage}
            handleSelectEmoji={handleSelectEmoji}
            disableSelectMode={disableSelectMode}
            handleDeleteMessages={handleDeleteMessages}
        />
    )
});

export default MessageInputContainer;