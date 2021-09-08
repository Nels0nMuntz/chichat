import React from 'react';

import { Avatar } from 'shared';

import style from "./Dialog.module.scss";
import '../../../../assets/styles/global/user-info.scss';


type DialogProps = {
    firstName: string
    lastName?: string
    avatar?: string
    lastMessage?: string
};

const Dialog: React.FC<DialogProps> = ({ firstName, lastName, lastMessage }) => {

    const fullname = firstName + (lastName ? ' ' + lastName : '');

    return (
        <div className="dialog user-info">
            <div className="avatar-wrapper">
                <div className={`${style.avatar} avatar`}>
                    <Avatar 
                        firstName="Александр"
                        lastName="Блок"
                        size="large"
                    />
                </div>
            </div>
            <div className="info">
                <div className="title">
                    <h3>{fullname}</h3>
                    <div className="last-message-meta">
                        <div className="time">10:18</div>
                    </div>
                </div>
                <div className={'subtitle'}>
                    <div className="last-message">{lastMessage}</div>
                    <div className={`${style.badge} ${style.unread}`}>28</div>
                </div>
            </div>
        </div>
    );
};

export default Dialog;