import React from 'react';
import { Picker } from 'emoji-mart';

import 'emoji-mart/css/emoji-mart.css';


type EmojiPickerProps = {
    theme?: "auto" | "light" | "dark"
};

const EmojiPicker : React.FC<EmojiPickerProps> = ({ theme }) => {
    return (
        <Picker
            theme={theme}
            onClick={(emoji) => console.log(emoji)}
        />
    )
};

export default EmojiPicker;