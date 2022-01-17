import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "core";


export const storeFile = (file: File): Promise<string> => {
    return new Promise(async(resolve, reject) => {
        try {
            const reference = ref(storage, file.name);
            await uploadBytes(reference, file);
            const dowloadURL = await getDownloadURL(reference);
            resolve(dowloadURL); 
        } catch (error) {
            reject(error);
        };
    });
};