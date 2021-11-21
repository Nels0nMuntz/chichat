import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DialogsTrack from '../components/DialogsTrack/DialogsTrack';
import { UniqueId } from '../models';
import { fetchMessagesAction, setActiveDialogAction } from '../store';
import { selectActiveDialog, selectDialogsList, selectDialogsStatus } from '../store';
import { Status } from 'shared';


const DialogsTrackContainer: React.FC = React.memo(() => {

    const dispatch = useDispatch();

    const status = useSelector(selectDialogsStatus);
    const dialogs = useSelector(selectDialogsList);
    const activeDialogId = useSelector(selectActiveDialog);

    const handleSelectDialog = React.useCallback((id: UniqueId) => {
        const dialog = dialogs.find(dialog => dialog.dialogId === id);
        if (!dialog) return;
        dispatch(setActiveDialogAction({ payload: dialog.dialogId }));
        if (dialog.status === Status.Initial) {
            dispatch(fetchMessagesAction({
                payload: {
                    dialogId: dialog.dialogId,
                    page: dialog.page,
                    limit: dialog.limit,
                }
            }));
        };
    }, [dialogs]);

    return (
        <DialogsTrack
            status={status}
            list={dialogs}
            selectedDialog={activeDialogId || null}
            handleSelectDialog={handleSelectDialog}
        />
    );
});

export default DialogsTrackContainer;