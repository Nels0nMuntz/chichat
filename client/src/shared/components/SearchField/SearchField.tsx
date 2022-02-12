import React from 'react';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';

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
    typing: boolean;
    loading: boolean;
    autoFocus?: boolean;
    handleFocus: () => void;
    handleSearch: (value: string) => void;
    resetSearch: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchField: React.FC<SearchFieldProps> = ({ value, editMode, typing, loading, autoFocus, handleChange, handleFocus, handleSearch, resetSearch }) => {

    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.code === "Enter") {
            handleSearch(value);
        };
    };

    React.useEffect(() => {
        if (!editMode) {
            inputRef.current?.blur();
        };
    }, [editMode]);

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
                onKeyDown={handleKeyDown}
            />
            <div className={`${style.adornment} ${style.startAdornment}`}>
                <i className={`icon-search ${style.adornmentIcon}`}></i>
            </div>
            <div className={`${style.adornment} ${style.endAdornment}`}>
                {typing || loading
                    ? (
                        <CircularProgress size={20} color='inherit' className={style.circularProgress} />
                    )
                    : (
                        <StyledIconButton size="small" onClick={resetSearch} >
                            <CloseIcon />
                        </StyledIconButton>
                    )}
            </div>
        </div>
    )
};

export default SearchField;