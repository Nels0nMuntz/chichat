import React from 'react';
import classNames from 'classnames';
import { ChildrenProps } from 'shared';

import '../ChatList.scss';


type ListItemProps = ChildrenProps & {
    selected?: boolean
    onClick?: () => void
};

const ListItem : React.FC<ListItemProps> = ({ children, selected, onClick }) => {
    return (
        <div 
            className={classNames(
                "chat-list-item",
                selected && "chat-list-item--selected"
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
};

export default ListItem;