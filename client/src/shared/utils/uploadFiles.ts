import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "core";


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

export const uploadFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
        const type = file.type;
        if (imageTypes.includes(type) && validateImage(file)) {
            storeFile(file);
        };
        if(videoTypes.includes(type)) {
            storeFile(file);
        }
    });
};

const validateImage = (file: File) => {
    var maxSizeInBytes = 10e6; // 10MB
    if (file.size > maxSizeInBytes) {
        alert("File too large");
        return false;
    };
    return true;
};

const storeFile = (file: File): string | null => {
    let link = null;
    try {
        const reference = ref(storage, file.name);
        uploadBytes(reference, file)
            .then(() => {
                getDownloadURL(reference).then(url => link = url);
            })
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    return link;
};