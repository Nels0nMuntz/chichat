import React from 'react';

import { ChildrenProps } from 'shared';


const ListItemIcon: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <div className="chart-list-item__icon list-item-avatar">
            <div className="list-item-icon__inner">
                {children}
            </div>
        </div>
    )
};

export default ListItemIcon;