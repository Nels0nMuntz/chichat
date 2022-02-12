import { compose } from 'ts-compose';

import { IDialogAttach } from "features/home/models";


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


export const uploadFiles = (files: FileList): Array<IDialogAttach> | Error => {
    try {
        const response = Array.from(files).reduce<Array<IDialogAttach>>((acc, file): Array<IDialogAttach> => {
            const type = file.type.split('/')[0];
            
            switch (type) {
                case 'image':
                    const imageSrc = compose(readMediaFile, validateImageSize, validateImageType)(file);
                    return [
                        ...acc, 
                        { file, previewLink: imageSrc },
                    ];
                case 'video':
                    const videoSrc = compose(readMediaFile, validateVideoSize, validateVideoType)(file);
                    return [
                        ...acc, 
                        { file, previewLink: videoSrc },
                    ];
                default:
                    const otherFile = validateOtherFilesSize(file);
                    if(!otherFile) return acc;
                    return [
                        ...acc,
                        { file: otherFile },
                    ];
            };
        }, []);
        return response
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

const readMediaFile = (file: File) => {
    return URL.createObjectURL(file);
};