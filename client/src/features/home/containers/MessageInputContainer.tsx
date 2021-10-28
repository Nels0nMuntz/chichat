import React from 'react';
import { BaseEmoji } from 'emoji-mart';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectTextMessageText,
    selectActiveDialog,
    selectUserData,
    selectSelectMode,
    selectDialogsList,
    setTextMessageAction,
    resetTextMessageAction,
    sendWSMessageAction,
    disableMessagesSelectModeAction,
    deleteMessagesInDBAction,
} from '../store';
import MessageInput from '../components/MessageInput/MessageInput';
import { IWSMessage, WSMessageTypes } from 'shared';
import { IMessageBase } from '../models';


const MessageInputContainer: React.FC = React.memo(() => {

    const dispatch = useDispatch();

    const [popups, setPopups] = React.useState({
        emoji: false,
        menu: false,
    });

    const user = useSelector(selectUserData);
    const dialogs = useSelector(selectDialogsList);
    const activeDialog = useSelector(selectActiveDialog);
    const textMessage = useSelector(selectTextMessageText);
    const selectMode = useSelector(selectSelectMode);

    const selectedMessages = dialogs
        .find(({ dialogId }) => dialogId === activeDialog)?.messages
        .filter(message => message.selected) || [];

    const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setTextMessageAction({ payload: e.target.value }));
    };
    const handleOpenEmojiPopup = React.useCallback(() => setPopups({ emoji: true, menu: false }), []);
    const handleCloseEmojiPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);
    const handleOpenMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: true }), []);
    const handleCloseMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);
    const handleSendTextMessage = React.useCallback(() => {
        if(!activeDialog) return;
        const message: IWSMessage<IMessageBase> = {
            type: WSMessageTypes.CREATE_MESSAGE,
            payload: {
                dialogId: activeDialog,
                createdBy: user.userId,
                content: {
                    type: "text",
                    text: textMessage.text,
                }
            }
        };
        dispatch(sendWSMessageAction({ payload: message }));
        dispatch(resetTextMessageAction({ payload: null }));
    }, [user, activeDialog, textMessage]);
    const handleSelectEmoji = React.useCallback((emoji: BaseEmoji) => { dispatch(setTextMessageAction({ payload: emoji })); }, []);
    const disableSelectMode = React.useCallback(() => { selectMode && dispatch(disableMessagesSelectModeAction({ payload: null })) }, [selectMode]);
    const handleDeleteMessages = React.useCallback(() => {
        dispatch(deleteMessagesInDBAction({ payload: selectedMessages.map(msg => msg.messageId) }));
        dispatch(disableMessagesSelectModeAction({ payload: null }));
    }, [selectedMessages]);

    if(!selectedMessages.length) disableSelectMode();

    if(!activeDialog) return null;
    return (
        <MessageInput
            value={textMessage.text}
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