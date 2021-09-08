import React from 'react';
import classNames from 'classnames';
import { generateAvatar } from 'shared';

import style from './Avatar.module.scss';


type AvatarSize = "small" | "large";

type AvatarProps = {
    firstName: string
    lastName: string
    avatar?: string
    size?: AvatarSize
};

const Avatar: React.FC<AvatarProps> = ({ firstName, lastName, avatar, size = "small" }) => {

    const hasAvatar = !!avatar;
    const color = generateAvatar(firstName);
 
    return (
        <div className={style.wrapper}>
            {hasAvatar ? (
                <img src={avatar} alt="avatar"/>
            ) : (
                <div 
                    className={classNames(
                        style.noImg,
                        size === "large" && style.large,
                    )}
                    style={{ background: `linear-gradient(#fff -125%, ${color})` }}
                >
                    {firstName[0] + (lastName && lastName[0])}
                </div>
            )}
        </div>
    );
};

export default Avatar;