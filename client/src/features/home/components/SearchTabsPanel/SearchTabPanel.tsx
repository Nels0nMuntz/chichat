import React from 'react';

import { ChildrenProps, CustomScroll } from 'shared';


type SearchTabPanelProps = ChildrenProps & {
    index: number
    activeTab: number
};

const SearchTabPanel: React.FC<SearchTabPanelProps> = React.memo(({ index, activeTab, children }) => {
    return (
        <CustomScroll>
            <div
                hidden={activeTab !== index}
            >
                {children}
            </div>
        </CustomScroll>
    )
});

export default SearchTabPanel;