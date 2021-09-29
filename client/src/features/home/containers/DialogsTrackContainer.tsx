import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DialogsTrack from '../components/DialogsTrack/DialogsTrack';
import { setSelectedDialogAction, fetchAllMessagesAction } from '../store/actions';
import { selectDialogsState, selectMessagesState } from '../store/selectors';


const DialogsTrackContainer: React.FC = React.memo(() => {

    const dispatch = useDispatch();

    const { status, list, selectedDialog } = useSelector(selectDialogsState);
    const { offset, limit } = useSelector(selectMessagesState);

    const handleSelectDialog = React.useCallback((id: string) => {
        const dialog = list.find(dialog => dialog.dialogId === id);
        dispatch(setSelectedDialogAction({ payload: dialog || null }));
        dispatch(fetchAllMessagesAction({ payload: { dialogId: id, offset, limit } }));
    }, [list]);

    return (
        <DialogsTrack
            status={status}
            list={list}
            selectedDialog={selectedDialog?.dialogId || null}
            handleSelectDialog={handleSelectDialog}
        />
    );
});

export default DialogsTrackContainer;