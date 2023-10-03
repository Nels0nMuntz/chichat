import React from 'react';

import { SearchField } from 'shared';
import { useDebounce } from "shared/hooks/useDebounce";


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

    const handleSearchDebounced = React.useCallback(useDebounce((value: string) => handleSearch(value), 500), []);
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        handleChange(value);
        handleSearchDebounced(value);
    };
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
            handleChange={handleChangeValue}
            handleFocus={handleFocus}
            handleSearch={handleSearch}
            resetSearch={resetSearch}
        />
    );
});

export default SidebarSearchField;