import React, { ChangeEvent } from 'react';
import { BaseEmoji } from 'emoji-mart';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'ts-compose';

import MessageInput from '../components/MessageInput/MessageInput';
import UploadFileModal from '../components/UploadFileModal/UploadFileModal';
import { IMessageContent, RecordState, MessageAttachType } from '../models';
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
    setMessageEmojiAction,
    createDialogMessageAction,
    selectUploadModal,
    setMessageInputEditModeAction,
} from '../store';
import {
    isEmptyString,
    wsManager,
    Status,
    audioRecorder,
} from 'shared';
import { openNotification } from 'features/notification/store';

const isEmptyMessage = (text?: string, attach?: Array<object>) => isEmptyString(text) && (!attach || !attach.length);

const MessageInputContainer: React.FC = React.memo(() => {

    const dispatch = useDispatch();

    const inputMediaRef = React.useRef<HTMLInputElement>(null);
    const inputDocumentRef = React.useRef<HTMLInputElement>(null);

    // const [editMode, setEditMode] = React.useState(false);
    const [recordState, setRecordState] = React.useState<RecordState>('inactive');
    const [popups, setPopups] = React.useState({
        emoji: false,
        menu: false,
    });

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
    const editMode = !!activeDialog?.form.editMode;

    const setEditMode = React.useCallback((value: boolean) => { dispatch(setMessageInputEditModeAction({ payload: value })) }, [])
    const handleMessageTextChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        dispatch(setMessageTextAction({ payload: value }));
        isEmptyString(value) ? setEditMode(false) : setEditMode(true);
    }, [setEditMode]);
    const handleOpenEmojiPopup = React.useCallback(() => setPopups({ emoji: true, menu: false }), []);
    const handleCloseEmojiPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);
    const handleOpenMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: true }), []);
    const handleCloseMenuPopup = React.useCallback(() => setPopups({ emoji: false, menu: false }), []);
    const handleSelectEmoji = React.useCallback((emoji: BaseEmoji) => {
        dispatch(setMessageEmojiAction({ payload: emoji }));
        !editMode && setEditMode(true);
    }, []);
    const disableSelectMode = React.useCallback(() => { selectMode && dispatch(changeSelectModeAction({ payload: false })) }, [selectMode]);
    const handleDeleteMessages = React.useCallback(() => {
        console.log('Deleting message will go here'); // TODO   Deleting message implementation         
    }, []);
    const handleCloseModal = React.useCallback(() => {
        dispatch(setUploadModalOpenAction({ payload: false }));
    }, []);
    const handleSubmitModal = React.useCallback(() => { console.log('submitting modal') }, []);
    const handleClickMediaUploadButton = React.useCallback(() => {
        inputMediaRef.current?.click();
    }, [inputMediaRef]);
    const handleClickDocumentUploadButton = React.useCallback(() => {
        inputDocumentRef.current?.click();
    }, [inputDocumentRef]);
    const handleChangeUploadInput = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files?.length) {
            dispatch(uploadFilesAction({ payload: files }));
        };
    }, [uploadFilesAction]);
    const handleChangeUploadModalText = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setUploadModalMessageTextAction({ payload: e.target.value }));
    }, [])
    const handleStartRecordAudio = React.useCallback(() => {
        setRecordState('recording');
        setEditMode(true);
        audioRecorder.start()
            .catch(error => dispatch(openNotification({ payload: { message: error.message, variant: 'error' } })));
    }, [audioRecorder, setEditMode, setRecordState]);
    const handlePauseRecordAudio = React.useCallback(() => {
        setRecordState('paused');
        audioRecorder.pause();
    }, [audioRecorder, setRecordState]);
    const handleResumeRecordAudio = React.useCallback(() => {
        setRecordState('recording');
        audioRecorder.resume();
    }, [audioRecorder, setRecordState]);
    const handleStopRecordAudio = React.useCallback((): Promise<File> => {
        return new Promise(async (resolve, reject) => {
            setRecordState('inactive');
            setEditMode(false);
            try {
                const file = await audioRecorder.stop();
                resolve(file);
            } catch (error: any) {
                reject(error);
            }
        });
    }, [audioRecorder, setEditMode, setRecordState]);
    const sendMessage = React.useCallback((text?: string, attach?: Array<{ file: File, type: MessageAttachType }>) => {
        if (!dialogId || isEmptyMessage(text, attach)) {
            dispatch(resetMessageTextAction({ payload: null }));
            setEditMode(false);
            return;
        }; 
        dispatch(createDialogMessageAction({ payload: {
            dialogId, 
            userId: user.userId,
            text: !isEmptyString(text) ? text : undefined,
            attach,
        } }));
    }, [dialogId, user, resetMessageTextAction, createDialogMessageAction, setEditMode]);
    const handleCancelRecordAudio = React.useCallback(() => {
        audioRecorder.cancel();
        setRecordState('inactive');
        setEditMode(false);
    }, [audioRecorder, setEditMode, setRecordState]);
    const handleClickSubmitButton = React.useCallback(async () => {

        const getCheckConditionFn = (condition: boolean) => (prev: boolean = true) => !prev ? prev : Boolean(condition);

        const isEditMode = getCheckConditionFn(editMode);
        const isNotEditMode = getCheckConditionFn(!editMode);
        const isRecordInactive = getCheckConditionFn(recordState === 'inactive');
        const isRecording = getCheckConditionFn(recordState === 'recording' || recordState === 'paused');
        const isTextMessageNotEmpty = getCheckConditionFn(!isEmptyString(messageText));

        const shouldSendTextMessage = compose(isTextMessageNotEmpty, isRecordInactive, isEditMode)();
        const shouldStartRecordAudio = compose(isRecordInactive, isNotEditMode)();
        const shouldSendAudioMessage = compose(isRecording, isEditMode)();

        if (shouldSendTextMessage) {
            sendMessage(messageText);
        };

        if (shouldStartRecordAudio) {
            handleStartRecordAudio();
        };

        if (shouldSendAudioMessage) {
            try {
                const file = await handleStopRecordAudio();
                if (!dialogId) {
                    dispatch(resetMessageTextAction({ payload: null }));
                    return;
                };        
                sendMessage(
                    messageText,
                    [{ file, type: 'voice' }],
                );       
            } catch (error: any) {
                console.log(error);
                dispatch(openNotification({ payload: { message: error.message, variant: 'error' } }));
            };
        };

    }, [
        dialogId, editMode, recordState, messageText,
        compose, isEmptyString, handleStopRecordAudio, handleStartRecordAudio, sendMessage
    ]);

    if (!selectedMessages.length) disableSelectMode();

    if (!activeDialog) return null;

    return (
        <React.Fragment>
            <MessageInput
                value={messageText}
                menuPopup={popups.menu}
                emojiPopup={popups.emoji}
                selectedMessages={selectedMessages.length}
                editMode={editMode}
                selectMode={selectMode}
                recordState={recordState}
                handleValueChange={handleMessageTextChange}
                handleOpenEmojiPopup={handleOpenEmojiPopup}
                handleCloseEmojiPopup={handleCloseEmojiPopup}
                handleOpenMenuPopup={handleOpenMenuPopup}
                handleCloseMenuPopup={handleCloseMenuPopup}
                handleClickSubmitButton={handleClickSubmitButton}
                handleSelectEmoji={handleSelectEmoji}
                disableSelectMode={disableSelectMode}
                handleDeleteMessages={handleDeleteMessages}
                handleClickMediaUpload={handleClickMediaUploadButton}
                handleClickDocumentUpload={handleClickDocumentUploadButton}
                handlePauseRecordAudio={handlePauseRecordAudio}
                handleResumeRecordAudio={handleResumeRecordAudio}
                handleCancelRecordAudio={handleCancelRecordAudio}
            />
            <input
                id="upload-media-file"
                className="visually-hidden"
                type="file"
                name="upload-media-file"
                accept="video/*, image/*"
                multiple
                ref={inputMediaRef}
                onChange={handleChangeUploadInput}
            />
            <input
                id="upload-document-file"
                className="visually-hidden"
                type="file"
                name="upload-document-file"
                accept="*"
                multiple
                ref={inputDocumentRef}
                onChange={handleChangeUploadInput}
            />
            <UploadFileModal
                open={open}
                valid={uploadStatus !== Status.Error}
                uploading={uploadStatus === Status.Running}
                sending={sendStatus === Status.Running}
                messageValue={uploadText}
                attach={attach}
                handleClose={handleCloseModal}
                handleSubmit={handleSubmitModal}
                handleChangeText={handleChangeUploadModalText}
            />
        </React.Fragment>
    )
});

export default MessageInputContainer;