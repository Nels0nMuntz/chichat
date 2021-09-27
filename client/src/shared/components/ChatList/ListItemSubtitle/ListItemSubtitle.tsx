import React from 'react';
import { ChildrenProps } from 'shared';


type ListItemSubtitleProps = ChildrenProps & {
    label?: string;
    suffix?: string | JSX.Element;
};

const ListItemSubtitle: React.FC<ListItemSubtitleProps> = ({ children, label, suffix }) => {
    return (
        <div className="chart-list-item__subtitle list-item-subtitle">
            <div className="list-item-subtitle__last-message">
                {children || label}
            </div>
            {suffix
                ? typeof suffix === "string"
                    ? (
                        <div className="chart-list-item__meta">
                            <div className="chart-list-item__time">
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