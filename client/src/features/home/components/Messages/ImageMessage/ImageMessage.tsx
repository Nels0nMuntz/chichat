import React from 'react';

import { IMessageAttachStore } from 'features/home/models';

import './ImageMessage.scss';


type ImageMessageProps = {
    attach: IMessageAttachStore[];
};

const ImageMessage: React.FC<ImageMessageProps> = React.memo(({ attach }) => {

    return (
        <div className="message-item__content-item image-message">
            {attach.map(({ url, attachId }) => (
                <img 
                    key={attachId}
                    src={url}
                    className="image-message__img-item"
                    alt="photo"
                />
            ))}
        </div>
    );
});

export default ImageMessage;