import React from 'react';

import { IMessageAttachStore } from 'features/home/models';

import './FileMessage.scss';


type FileMessageProps = {
  attach: IMessageAttachStore;
};

const FileMessage: React.FC<FileMessageProps> = React.memo(({ attach }) => {

  return (
    <div className="message-item__content-item file-message">
      <a href={attach.url} download="" target="_blank" className="file-message__link">
        <span  className="file-message__icon">{attach.name.split(".").pop()}</span>
        <span className="file-message__name">{attach.name}</span>
      </a>
    </div>
  );
});

export default FileMessage;