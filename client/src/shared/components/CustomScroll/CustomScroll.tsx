import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { ChildrenProps } from 'shared';


const renderTrackVertical = ({ style, ...props }: any) => {
    const trackStyle = {
        position: 'absolute',
        width: '6px',
        right: '0px',
        bottom: '2px',
        top: '2px',
        borderRadius: '0px',
        transition: 'opacity 200ms ease 0s',
    };
    return (
        <div style={{ ...style, ...trackStyle }} {...props}/>
    )
};

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
            autoHide={false}
            renderThumbVertical={renderThumb}
            renderThumbHorizontal={renderThumb}
            renderTrackVertical={renderTrackVertical}
            hideTracksWhenNotNeeded={true}
        >
            {children}
        </Scrollbars>
    )
};

export default CustomScroll;