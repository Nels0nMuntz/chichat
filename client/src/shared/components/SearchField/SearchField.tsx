import React from 'react';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';

import style from './SearchField.module.scss';

const StyledIconButton = withStyles({
    root: {
        padding: '6px',
        '&:hover': {
            backgroundColor: 'var(--touche-ripple-hover)',
        },
        '& .MuiSvgIcon-root': {
            fontSize: "1rem",
            fill: "var(--color-text-100)",
        },
    },
})(IconButton);

type SearchFieldProps = {
    value: string;
    editMode: boolean;
    autoFocus?: boolean;
    handleFocus: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchField: React.FC<SearchFieldProps> = ({ value, editMode, autoFocus, handleChange, handleFocus }) => {  

    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if(!editMode){
            inputRef.current?.blur();
        };
    }, [editMode]);

    // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if(e.code === "Escape") {
    //         inputRef.current?.blur();
    //         setValue("");
    //     };
    // };

    return (
        <div className={style.searchInputWrapper}>
            <input
                ref={inputRef}
                className={style.searchInput}
                type="text"
                placeholder="Search"
                value={value}
                onChange={handleChange}
                autoFocus={autoFocus}
                onFocus={handleFocus}
                // onKeyDown={handleKeyDown}
            />
            <div className={`${style.adornment} ${style.startAdornment}`}>
                <i className={`icon-search ${style.adornmentIcon}`}></i>
            </div>
            <div className={`${style.adornment} ${style.endAdornment}`}>
                {true
                    ? (
                        <StyledIconButton size="small" >
                            <CloseIcon />
                        </StyledIconButton>
                    )
                    : <CircularProgress size={20} color='inherit' className={style.circularProgress} />}
            </div>
        </div>
    )
};

export default SearchField;