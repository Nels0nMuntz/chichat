import React from 'react';

import { SearchField } from 'shared';
 

type SidebarSearchFieldProps = {
    searchMode: boolean;
    enableSearchMode: () => void
};

const SidebarSearchField : React.FC<SidebarSearchFieldProps> = React.memo(({ searchMode, enableSearchMode }) => {

    const [value, setValue] = React.useState("");
    
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
    const handleFocus = React.useCallback(() => enableSearchMode(), [enableSearchMode]);

    React.useEffect(() => {
        if(!searchMode) setValue("");
    }, [searchMode]);

    return (
        <SearchField
            value={value}
            editMode={searchMode}
            handleChange={handleChange}
            handleFocus={handleFocus}
        />
    )
});

export default SidebarSearchField;