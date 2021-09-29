import React from 'react';
import uk from "date-fns/locale/uk"
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import {
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemInfo,
    ListItemTitle,
    ListItemSubtitle,
    IUser,
    getUserFullname,
} from 'shared';
import { IMessage } from '../../models';

// import style from "./Dialog.module.scss";
import '../../../../assets/styles/global/user-info.scss';


type DialogProps = {
    dialogId: string;
    member: IUser;
    lastMessage?: IMessage;
    isSelected: boolean;
    handleSelectDialog: (id: string) => void;
};

const Dialog: React.FC<DialogProps> = React.memo(({ dialogId, member, lastMessage, isSelected, handleSelectDialog }) => {

    const messageText = lastMessage?.content.text || '';
    const suffix = lastMessage?.updatedAt
        ? formatDistanceToNow(
            new Date(lastMessage.updatedAt),
            {
                includeSeconds: true,
                locale: uk
            }
        )
        : undefined;

    return (
        <ListItem
            selected={isSelected}
            onClick={() => handleSelectDialog(dialogId)}
        >
            <ListItemIcon>
                <Avatar
                    user={member}
                    size="large"
                />
            </ListItemIcon>
            <ListItemInfo>
                <ListItemTitle suffix={suffix}>{getUserFullname(member)}</ListItemTitle>
                <ListItemSubtitle>{messageText}</ListItemSubtitle>
            </ListItemInfo>
        </ListItem>
    );
});

export default Dialog;