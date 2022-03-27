import { compose } from 'ts-compose';

import { IDialogFormAttach } from "features/home/models";


const imageTypes = [
    "image/gif",
    "image/avif",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/vnd.wap.wbmp",
    "image/webp",
];
const videoTypes = [
    "video/avi",
    "video/mpeg",
    "video/mp4",
    "video/ogg",
    "video/quicktime",
    "video/webm",
    "video/x-flv",
    "video/MP2T",
    "video/3gpp",
    "video/3gpp2",
    "video/x-msvideo",
    "video/x-ms-wmv",
];
const audioTypes = [
    "audio/basic",
    "audio/L24",
    "audio/mp4",
    "audio/aac",
    "audio/mpeg",
    "audio/ogg",
    "audio/vorbis",
    "audio/x-ms-wma",
    "audio/x-ms-wax",
    "audio/vnd.wave",
    "audio/webm",
];


export const uploadFiles = (files: FileList): Array<IDialogFormAttach> | Error => {
    try {
        const response = Array.from(files).reduce<Array<IDialogFormAttach>>((acc, file): Array<IDialogFormAttach> => {
            const type = file.type.split('/')[0];
            
            switch (type) {
                case 'image':
                    const imageLink = compose(getPreviewLink, validateImageSize, validateImageType)(file);
                    return [
                        ...acc, 
                        { file, type: 'image', previewLink: imageLink },
                    ];
                case 'video':
                    const videolink = compose(getPreviewLink, validateVideoSize, validateVideoType)(file);
                    return [
                        ...acc, 
                        { file, type: 'video', previewLink: videolink },
                    ];
                default:
                    const otherFile = validateOtherFilesSize(file);
                    if(!otherFile) return acc;
                    return [
                        ...acc,
                        { file: otherFile, type: 'file' },
                    ];
            };
        }, []);
        return response;
    } catch (error: any) {
        return error as Error;
    }
};

const validateImageType = (file: File) => {
    if (!imageTypes.includes(file.type)) {
        throw new Error(`Invalid '${file.name}' file type`);
    }
    return file;
};

const validateVideoType = (file: File) => {
    if (!videoTypes.includes(file.type)) {
        throw new Error(`Invalid '${file.name}' file type`);
    }
    return file;
};

const validateImageSize = (file: File): File => {
    const maxSizeInBytes = 10e6; // 10MB
    if (file.size > maxSizeInBytes) {
        throw new Error(`File '${file.name}' is too large`);
    };
    return file;
};

const validateVideoSize = (file: File): File => {
    const maxSizeInBytes = 200e6; // 200MB
    if (file.size > maxSizeInBytes) {
        throw new Error(`File '${file.name}' is too large`);
    };
    return file;
};

const validateOtherFilesSize = (file: File): File => {
    const maxSizeInBytes = 1500e6; // 1500MB
    if (file.size > maxSizeInBytes) {
        throw new Error(`File '${file.name}' is too large`);
    };
    return file;
};

const getPreviewLink = (file: File) => {
    return URL.createObjectURL(file);
};