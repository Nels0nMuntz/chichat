import React, { ChangeEvent } from 'react';
import { BaseEmoji } from 'emoji-mart';
import { useDispatch, useSelector } from 'react-redux';


import MessageInput from '../components/MessageInput/MessageInput';
import UploadFileModal from '../components/UploadFileModal/UploadFileModal';
import {
    selectActiveDialog,
    selectUserData,
    sendWSMessageAction,
    setMessageTextAction,
    resetMessageTextAction,
    changeSelectModeAction,
    setUploadModalOpenAction,
    setUploadModalMessageTextAction,
    uploadFilesAction,
    setUploadModalAttachAction,
    selectUploadModal,
} from '../store';
import { setNotification } from 'features/notification/store';
import {
    isEmptyString,
    wsManager,
    Status,
    uploadFiles,
    audioRecorder,
} from 'shared';

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));


const MessageInputContainer: React.FC = React.memo(() => {

    const dispatch = useDispatch();

    const inputMediaRef = React.useRef<HTMLInputElement>(null);
    const inputDocumentRef = React.useRef<HTMLInputElement>(null);

    const [popups, setPopups] = React.useState({
        emoji: false,
        menu: false,
    });
    const [recordMode, setRecordMode] = React.useState(false);

    const user = useSelector(selectUserData);
    const activeDialog = useSelector(selectActiveDialog);
    const {
        open,
        sendStatus,
        uploadStatus,
        text: uploadText,
        attach,
    } = useSelector(selectUploadModal);
    const dialogId = activeDialog?.dialogId;
    const messageText = activeDialog?.form.text || '';
    const selectMode = activeDialog?.messages.selectMode || false;
    const selectedMessages = activeDialog?.messages.list.filter(({ selected }) => selected) || [];

    const handleValueChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (dialogId) {
            dispatch(setMessageTextAction({ payload: e.target.value }));
        };
    }, [dialogId]);
    const handleOpenEmojiPopup = React.useCallback(() => setPopups({ emoji: true, menu: false }), []);
    const handleCloseEmojiPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);
    const handleOpenMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: true }), []);
    const handleCloseMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);
    const handleSendTextMessage = React.useCallback(() => {
        if (dialogId && !isEmptyString(messageText)) {
            const message = wsManager.createTextMessage(dialogId, user.userId, messageText)
            dispatch(sendWSMessageAction({ payload: message }));
            dispatch(resetMessageTextAction({ payload: null }));
        };

    }, [dialogId, messageText, user, wsManager]);
    const handleSelectEmoji = React.useCallback((emoji: BaseEmoji) => { dispatch(setMessageTextAction({ payload: emoji.native })); }, []);
    const disableSelectMode = React.useCallback(() => { selectMode && dispatch(changeSelectModeAction({ payload: false })) }, [selectMode]);
    const handleDeleteMessages = React.useCallback(() => {
        console.log('Deleting message will go here');
        // TODO   Deleting message implementation 
        // dispatch(deleteMessagesInDBAction({ payload: selectedMessages.map(msg => msg.messageId) }));
        // dispatch(disableMessagesSelectModeAction({ payload: null }));
    }, []);
    const handleCloseModal = React.useCallback(() => {
        dispatch(setUploadModalOpenAction({ payload: false }));
        dispatch(setUploadModalAttachAction({ payload: [] }));
    }, []);
    const handleSubmitModal = React.useCallback(() => { console.log('submitting modal') }, []);
    const handleClickMediaUploadButton = React.useCallback(() => {
        inputMediaRef.current?.click();
    }, [inputMediaRef]);
    const handleClickDocumentUploadButton = React.useCallback(() => {
        inputDocumentRef.current?.click();
    }, [inputDocumentRef]);
    const handleChangeMediaInput = React.useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files?.length) {
            const attach = uploadFiles(files);
            if (attach instanceof Error) {
                dispatch(setNotification({ payload: { status: Status.Error, message: attach.message } }));
                return;
            } else {
                dispatch(setUploadModalOpenAction({ payload: true }));
                dispatch(setUploadModalAttachAction({ payload: attach }));
            };
        };
    }, []);
    const handleStartRecordAudio = React.useCallback(async () => {
        setRecordMode(true);
    }, []);
    const handleStopRecordAudio = React.useCallback(async () => {
        setRecordMode(false);
    }, []);
    const handleCancelRecordAudio = React.useCallback(async () => {
        setRecordMode(false);
    }, []);

    if (!selectedMessages.length) disableSelectMode();

    if (!activeDialog) return null;

    return (
        <React.Fragment>
            <MessageInput
                value={messageText}
                menuPopup={popups.menu}
                emojiPopup={popups.emoji}
                selectedMessages={selectedMessages.length}
                selectMode={selectMode}
                recordMode={recordMode}
                handleValueChange={handleValueChange}
                handleOpenEmojiPopup={handleOpenEmojiPopup}
                handleCloseEmojiPopup={handleCloseEmojiPopup}
                handleOpenMenuPopup={handleOpenMenuPopup}
                handleCloseMenuPopup={handleCloseMenuPopup}
                handleSendTextMessage={handleSendTextMessage}
                handleSelectEmoji={handleSelectEmoji}
                disableSelectMode={disableSelectMode}
                handleDeleteMessages={handleDeleteMessages}
                handleClickMediaUpload={handleClickMediaUploadButton}
                handleClickDocumentUpload={handleClickDocumentUploadButton}
                handleStartRecordAudio={handleStartRecordAudio}
                handleStopRecordAudio={handleStopRecordAudio}
            />
            <input
                id="upload-media-file"
                className="visually-hidden"
                type="file"
                name="upload-media-file"
                accept="video/*, image/*"
                multiple
                ref={inputMediaRef}
                onChange={handleChangeMediaInput}
            />
            <input
                id="upload-document-file"
                className="visually-hidden"
                type="file"
                name="upload-document-file"
                accept="*"
                multiple
                ref={inputDocumentRef}
                onChange={handleChangeMediaInput}
            />
            <UploadFileModal
                // status={uploadStatus}
                open={open}
                valid={uploadStatus !== Status.Error}
                loading={sendStatus === Status.Running}
                messageValue={uploadText}
                attach={attach}
                handleClose={handleCloseModal}
                handleSubmit={handleSubmitModal}
                handleChangeMessage={handleValueChange}
            />
        </React.Fragment>
    )
});

export default MessageInputContainer;