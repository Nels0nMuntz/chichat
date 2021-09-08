import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { ChildrenProps } from 'shared';


const renderThumb = ({ style, ...props }: any) => {
    const thumbStyle = {
        borderRadius: 6,
        backgroundColor: 'rgba(87,98,113,0.5)',
    };
    return (
        <div style={{ ...style, ...thumbStyle }} {...props} />
    )
};

const CustomScroll: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <Scrollbars
            autoHide
            renderThumbVertical={renderThumb}
            renderThumbHorizontal={renderThumb}
            hideTracksWhenNotNeeded={true}
        >
            {children}
        </Scrollbars>
    )
};

export default CustomScroll;