import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
        selectTextMessageText, 
        setTextMessageAction,
        // sentTextMessageAction,
    } from '../store';
import MessageInput from '../components/MessageInput/MessageInput';


const MessageInputContainer : React.FC = React.memo(() => {

    const dispatch = useDispatch();

    const [popups, setPopups] = React.useState({
        emoji: false,
        menu: false,
    });

    const messageValue = useSelector(selectTextMessageText);

    const handleValueChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setTextMessageAction({ payload: e.target.value }));
    }, []);
    const handleOpenEmojiPopup = React.useCallback(() => setPopups({ emoji: true, menu: false }), []);
    const handleCloseEmojiPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);
    const handleOpenMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: true }), []);
    const handleCloseMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);
    // const handleSendTextMessage = React.useCallback(() => {
    //     dispatch(sentTextMessageAction({ payload:  }))
    // }, [])

    return (
        <MessageInput
            value={messageValue}
            menuPopup={popups.menu}
            emojiPopup={popups.emoji}
            handleValueChange={handleValueChange}
            handleOpenEmojiPopup={handleOpenEmojiPopup}
            handleCloseEmojiPopup={handleCloseEmojiPopup}
            handleOpenMenuPopup={handleOpenMenuPopup}
            handleCloseMenuPopup={handleCloseMenuPopup}
        />
    )
});

export default MessageInputContainer;