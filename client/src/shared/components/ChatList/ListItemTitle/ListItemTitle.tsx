import React from 'react';
import { ChildrenProps } from 'shared';


type ListItemTitleProps = ChildrenProps & {
    label?: string;
    suffix?: string | JSX.Element
};

const ListItemTitle: React.FC<ListItemTitleProps> = ({ label, suffix, children }) => {
    return (
        <div className="chat-list-item__title">
            <h3>{children || label}</h3>
            {!suffix
                ? null
                : typeof suffix === "string"
                    ? (
                        <div className="chat-list-item__meta">
                            <div className="chat-list-item__time">{suffix}</div>
                        </div>
                    ) : (
                        suffix
                    )}
        </div>
    )
};

export default ListItemTitle;