import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DialogsTrack from '../components/DialogsTrack/DialogsTrack';
import { fetchDialogMessagesAction, setActiveDialogAction } from '../store';
import { selectDialogsList, selectDialogsStatus } from '../store';
import { Status, UniqueId } from 'shared';


const DialogsTrackContainer: React.FC = React.memo(() => {

    const dispatch = useDispatch();

    const status = useSelector(selectDialogsStatus);
    const dialogs = useSelector(selectDialogsList);

    const handleSelectDialog = React.useCallback((id: UniqueId) => {
        const dialog = dialogs.find(dialog => dialog.dialogId === id);
        if (!dialog) return;
        dispatch(setActiveDialogAction({ payload: dialog.dialogId }));
        if (dialog.status === Status.Initial) {
            dispatch(fetchDialogMessagesAction({
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
            handleSelectDialog={handleSelectDialog}
        />
    );
});

export default DialogsTrackContainer;