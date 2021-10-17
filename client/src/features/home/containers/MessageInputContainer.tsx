import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectTextMessageText,
    setTextMessageAction,
    selectActiveDialog,
    selectUserData,
    selecteWebSocket,
    sendWSMessageAction,
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
    const activeDialog = useSelector(selectActiveDialog);
    const textMessage = useSelector(selectTextMessageText);
    const ws = useSelector(selecteWebSocket);

    const handleValueChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setTextMessageAction({ payload: e.target.value }));
    }, []);
    const handleOpenEmojiPopup = React.useCallback(() => setPopups({ emoji: true, menu: false }), []);
    const handleCloseEmojiPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);
    const handleOpenMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: true }), []);
    const handleCloseMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);
    const handleSendTextMessage = React.useCallback(() => {
        const message: IWSMessage<IMessageBase> = {
            type: WSMessageTypes.CREATE_MESSAGE,
            payload: {
                dialogId: activeDialog?.dialogId || "",
                createdBy: user.userId,
                content: {
                    type: "text",
                    text: textMessage.text,
                }
            }
        };
        dispatch(sendWSMessageAction({ payload: message }));
    }, [user, activeDialog, textMessage, ws]);

    if(!activeDialog) return null;
    return (
        <MessageInput
            value={textMessage.text}
            menuPopup={popups.menu}
            emojiPopup={popups.emoji}
            handleValueChange={handleValueChange}
            handleOpenEmojiPopup={handleOpenEmojiPopup}
            handleCloseEmojiPopup={handleCloseEmojiPopup}
            handleOpenMenuPopup={handleOpenMenuPopup}
            handleCloseMenuPopup={handleCloseMenuPopup}
            handleSendTextMessage={handleSendTextMessage}
        />
    )
});

export default MessageInputContainer;