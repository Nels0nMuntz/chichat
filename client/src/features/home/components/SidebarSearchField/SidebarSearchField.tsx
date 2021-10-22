import React from 'react';

import { SearchField } from 'shared';


type Fn = (args: string) => void;
type FnOptional = (args?: any) => void;
type DebounceArgs = { fn: Fn, delay: number, fnStart?: FnOptional, fnEnd?: FnOptional, fnEvery?: Fn };

const debounce = ({ fn, delay, fnStart, fnEnd, fnEvery }: DebounceArgs) => {
    let timeout: NodeJS.Timeout;
    let start = false;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!start) {
            start = !start;
            fnStart && fnStart();
        }
        fnEvery && fnEvery(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(e.target.value);
            fnEnd && fnEnd();
            start = false;
        }, delay);
    };
};

type SidebarSearchFieldProps = {
    value: string;
    typing: boolean;
    loading: boolean;
    searchMode: boolean;
    enableSearchMode: () => void
    handleSearch: (value: string) => void;
    handleChange: (value: string) => void;
    handleTyping: (value: boolean) => void;
    resetSearch: () => void;
};

const SidebarSearchField: React.FC<SidebarSearchFieldProps> = React.memo((props) => {

    const { value, typing, loading, searchMode, enableSearchMode, handleSearch, handleChange, handleTyping, resetSearch } = props;

    const handleChangeDebounced = debounce({
        fn: handleSearch,
        delay: 400,
        fnEvery: handleChange,
        fnStart: () => handleTyping(true),
        fnEnd: () => handleTyping(false),
    });
    const handleFocus = React.useCallback(() => enableSearchMode(), [enableSearchMode]);

    React.useEffect(() => {
        if (!searchMode) handleChange("");
    }, [searchMode]);

    return (
        <SearchField
            value={value}
            typing={typing}
            loading={loading}
            editMode={searchMode}
            handleChange={handleChangeDebounced}
            handleFocus={handleFocus}
            handleSearch={handleSearch}
            resetSearch={resetSearch}
        />
    );
});

export default SidebarSearchField;