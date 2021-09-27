import React from 'react';

import { ChildrenProps } from 'shared';


const ListItemInfo: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <div className="chart-list-item__info">
            {children}
        </div>
    )
};

export default ListItemInfo;