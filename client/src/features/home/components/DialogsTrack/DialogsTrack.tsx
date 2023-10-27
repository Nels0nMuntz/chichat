import React from 'react';

import Dialog from '../Dialog/Dialog';
import { IDialog } from '../../models';
import { CustomScroll, withLoader } from 'shared';

import style from './DialogsTrack.module.scss';


type DialogsTrackProps = {
    list: Array<IDialog>;
    handleSelectDialog: (id: string) => void;
};

const DialogsTrack: React.FC<DialogsTrackProps> = React.memo(({ list, handleSelectDialog }) => {
    return (
        <CustomScroll>
            <div className={style.dialogs}>
                {list
                    .map(dialog => (
                        <Dialog
                            key={dialog.dialogId}
                            dialog={dialog}
                            handleSelectDialog={handleSelectDialog}
                        />
                    ))}
            </div>
        </CustomScroll>
    );
});

export default withLoader(DialogsTrack);