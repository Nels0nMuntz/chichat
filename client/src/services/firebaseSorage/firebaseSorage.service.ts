import { ref, uploadBytes, UploadMetadata, getDownloadURL, StorageReference, getBytes, getMetadata, FullMetadata } from "firebase/storage";
import { storage } from "core";
import axios, { AxiosResponse } from 'axios';


class FirebaseSorage {

    private createStorageRef = (url: string): StorageReference => {
        return ref(storage, url);
    }

    storeFile = async (folder: string, file: File, metadata?: UploadMetadata): Promise<string> => {
        const storageRefUrl = `${folder}/${file.name}`;
        const reference = this.createStorageRef(storageRefUrl);
        try {
            await uploadBytes(reference, file, metadata);
            return await getDownloadURL(reference);
        } catch (error: any) {
            throw error.response;
        }
    }

    getBlob = async (url: string): Promise<Blob> => {
        try {
            const response: AxiosResponse<Blob> = await axios.get(url, { responseType: 'blob' });
            return response.data;
        } catch (error: any) {
            throw error.response;
        }
    }

    getBytes = async (url: string): Promise<ArrayBuffer> => {
        const reference = this.createStorageRef(url);
        try {
            return await getBytes(reference);
        } catch (error: any) {
            throw error.response;
        }
    }

    getMetadata = async (url: string): Promise<FullMetadata> => {
        const reference = this.createStorageRef(url);
        try {
            return await getMetadata(reference);
        } catch (error: any) {
            throw error.response;
        };
    }

    getArrayBuffer = async (url: string): Promise<ArrayBuffer> => {
        try {
            const response: AxiosResponse<ArrayBuffer> = await axios.get(url, { responseType: 'arraybuffer' });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
};

export const firebaseSorage = new FirebaseSorage();