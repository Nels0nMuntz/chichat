import React from 'react';

import Dialog from '../Dialog/Dialog';
import { IDialog } from '../../models';
import { CustomScroll, withLoader } from 'shared';

import style from './DialogsTrack.module.scss';


type DialogsTrackProps = {
    list: Array<IDialog>;
    selectedDialog: string | null;
    handleSelectDialog: (id: string) => void;
};

const DialogsTrack: React.FC<DialogsTrackProps> = React.memo(({ list, selectedDialog, handleSelectDialog }) => {
    return (
        <CustomScroll>
            <div className={style.dialogs}>
                {list.sort((a, b) => +new Date(b.lastMessage?.createdAt) - (+new Date(a.lastMessage?.createdAt))).map(({ dialogId, member, lastMessage }) => (
                    <Dialog
                        key={dialogId}
                        dialogId={dialogId}
                        member={member}
                        lastMessage={lastMessage}
                        isSelected={Boolean(selectedDialog) && selectedDialog === dialogId}
                        handleSelectDialog={handleSelectDialog}
                    />
                ))}
            </div>
        </CustomScroll>
    );
});

export default withLoader(DialogsTrack);