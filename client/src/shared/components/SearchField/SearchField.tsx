import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import style from './SearchField.module.scss';


type SearchFieldProps = {
    // status: Status
    autoFocus?: boolean
};

const SearchField: React.FC<SearchFieldProps> = ({ autoFocus }) => {
    return (
        <div className={style.searchInputWrapper}>
            <input
                className={style.searchInput}
                type="text"
                placeholder="Search"
                autoFocus={autoFocus}
            />
            <div className={`${style.adornment} ${style.startAdornment}`}>
                <i className={`icon-search ${style.adornmentIcon}`}></i>
            </div>
            <div className={`${style.adornment} ${style.endAdornment}`}>
                {true
                    ? (
                        <button>
                            <i className={`icon-cancel ${style.adornmentIcon}`}></i>
                        </button>
                    )
                    : <CircularProgress size={20} color='inherit' className={style.circularProgress} />}
            </div>
        </div>
    )
};

export default SearchField;