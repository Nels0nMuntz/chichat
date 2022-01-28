import { MessageAttachType } from "features/home/models";
import { isEmptyString } from 'shared';

export const checkAttachType = (mime: string): MessageAttachType => {
    const type = mime.split('/')[0];
    if(isEmptyString(type)) return 'file';
    switch (type) {
        case 'image':
            return 'image';    
        case 'video':
            return 'video';    
        case 'audio':
            return 'file';    
        default:
            return 'file';
    };
};