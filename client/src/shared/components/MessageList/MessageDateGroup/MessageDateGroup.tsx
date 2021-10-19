import React from 'react';
import { ChildrenProps } from 'shared';
import StickyDate from '../StickyDate/StickyDate';


type MessageDateGroupProps = ChildrenProps & {
    period: string;
};

const MessageDateGroup : React.FC<MessageDateGroupProps> = ({ period, children }) => {
    return (
        <div className="message-date-group">
            <StickyDate period={period} />
            {children}
        </div>
    );
};

export default MessageDateGroup;