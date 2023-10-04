import React from 'react';

import { IMessageAttachStore } from 'features/home/models';

import './VideoMessage.scss';


type VideoMessageProps = {
    attach: IMessageAttachStore;
};

const VideoMessage: React.FC<VideoMessageProps> = React.memo(({ attach }) => {

    return (
        <div className="message-item__content-item video-message">
          <video className="video-message__item" src={attach.url} controls></video>
        </div>
    );
});

export default VideoMessage;