import React from 'react';


type StickyDateProps = {
    period: string;
};

const StickyDate : React.FC<StickyDateProps> = ({ period }) => {
    return (
        <div className="message-date-group__sticky-date">
            <span>{period}</span>
        </div>
    );
};

export default StickyDate;