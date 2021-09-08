import React from 'react';
import { withStyles } from '@material-ui/styles';
import SentimentIcon from '@material-ui/icons/SentimentSatisfiedOutlined';

import { Popover, EmojiPicker, AppTheme, ThemeContext } from 'shared';

import style from './Popups.module.scss';


const StyledSentimentIcon = withStyles({
    root: {
        color: 'var(--color-text-100)',
        transition: 'color 0.1s linear',
        '&:hover': {
            color: 'var(--color-primary)',
        },
    }
})(SentimentIcon);

type EmojiPickerPopupProps = {
    open: boolean
    handleOpen: () => void
    handleClose: () => void
};

const EmojiPickerPopup: React.FC<EmojiPickerPopupProps> = React.memo(({ open, handleOpen, handleClose }) => {

    const { theme } = React.useContext(ThemeContext);

    const сontainer = React.useRef<HTMLDivElement>(null);

    const [сontainerRef, setСontainerRef] = React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => setСontainerRef(сontainer.current), []);

    return (
        <React.Fragment>
            <Popover
                open={open}
                component={<EmojiPicker theme={theme === AppTheme.Light ? "light" : "dark"} />}
                placement="bottom-start"
                transformOrigin="0 100%"
                container={сontainerRef}
                hover
                onOpen={handleOpen}
                onClose={handleClose}
            >
                <button className={style.input_action}>
                    <StyledSentimentIcon/>
                </button>
            </Popover>
            <div className={`${style.message_popover_container} ${style.emoji_container}`} ref={сontainer}></div>
        </React.Fragment>
    )
});

export default EmojiPickerPopup;