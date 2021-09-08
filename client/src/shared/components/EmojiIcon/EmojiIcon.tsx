import React from 'react';

import style from './EmojiIcon.module.scss';


type EmojiIconType = {
    symbol: string
    label: string
};

const EmojiIcon: React.FC<EmojiIconType> = ({ symbol, label }) => {
    return (
        <span className={style.emoji}
            role="img"
            aria-label={label ? label : ""}
            aria-hidden={label ? "false" : "true"}
            title={label}
        >
            {symbol}
        </span>
    )
};

export default EmojiIcon;