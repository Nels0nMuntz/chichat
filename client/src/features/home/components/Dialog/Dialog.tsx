import React from 'react';
import enUs from "date-fns/locale/en-US"
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import {
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemInfo,
    ListItemTitle,
    ListItemSubtitle,
    getUserFullname,
    isEmptyString,
} from 'shared';
import { IDialog } from '../../models';

import styles from './Dialog.module.scss';
import '../../../../assets/styles/global/user-info.scss';


type DialogProps = {
    dialog: IDialog;
    handleSelectDialog: (id: string) => void;
};

const Dialog: React.FC<DialogProps> = React.memo(({ dialog, handleSelectDialog }) => {

    const inputText = dialog.form.text;
    const lastMessage = dialog.messages.lastMessage;
    const lastMessageText = lastMessage?.content.text || '';
    const suffix = lastMessage?.updatedAt
        ? formatDistanceToNow(
            new Date(lastMessage.createdAt),
            {
                includeSeconds: true,
                locale: enUs
            }
        )
        : undefined;
    const draft = !dialog.isActive && !isEmptyString(inputText) ? <span><span className={styles.draft}>Draft:</span> {inputText}</span> : undefined;

    return (
        <ListItem
            selected={dialog.isActive}
            onClick={() => handleSelectDialog(dialog.dialogId)}
        >
            <ListItemIcon>
                <Avatar
                    user={dialog.member}
                    size="large"
                />
            </ListItemIcon>
            <ListItemInfo>
                <ListItemTitle suffix={suffix}>{getUserFullname(dialog.member)}</ListItemTitle>
                <ListItemSubtitle>
                    {draft || lastMessageText}
                </ListItemSubtitle>
            </ListItemInfo>
        </ListItem>
    );
});

export default Dialog;