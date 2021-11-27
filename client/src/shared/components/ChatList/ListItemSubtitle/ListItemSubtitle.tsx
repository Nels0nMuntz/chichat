import React from 'react';
import { ChildrenProps } from 'shared';


type ListItemSubtitleProps = ChildrenProps & {
    label?: string;
    suffix?: string | JSX.Element;
    prefix?: string | JSX.Element;
};

const ListItemSubtitle: React.FC<ListItemSubtitleProps> = ({ children, label, suffix, prefix }) => {
    return (
        <div className="chat-list-item__subtitle list-item-subtitle">
            <div className="list-item-subtitle__last-message">
                {prefix}
                {children || label}
            </div>
            {suffix
                ? typeof suffix === "string"
                    ? (
                        <div className="chat-list-item__meta">
                            <div className="chat-list-item__time">
                                {suffix}
                            </div>
                        </div>
                    )
                    : (
                        suffix
                    )
                : null
            }
        </div>
    )
};

export default ListItemSubtitle;