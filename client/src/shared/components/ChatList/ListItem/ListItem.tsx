import React from 'react';
import { ChildrenProps } from 'shared';

import '../ChartList.scss';


const ListItem : React.FC<ChildrenProps> = ({ children }) => {
    return (
        <div className="chart-list-item">
            {children}
        </div>
    )
};

export default ListItem;