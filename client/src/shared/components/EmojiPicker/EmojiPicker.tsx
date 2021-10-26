import React from 'react';
import { BaseEmoji, Picker } from 'emoji-mart';

import 'emoji-mart/css/emoji-mart.css';


type EmojiPickerProps = {
    theme?: "auto" | "light" | "dark";
    handleSelect: (emoji: BaseEmoji) => void;
};

const EmojiPicker : React.FC<EmojiPickerProps> = ({ theme, handleSelect }) => {

    const handleSelectEmoji = React.useCallback((emoji: BaseEmoji) => handleSelect(emoji), []);

    return (
        <Picker
            theme={theme}
            native={true}
            onSelect={handleSelectEmoji}
        />
    )
};

export default EmojiPicker;