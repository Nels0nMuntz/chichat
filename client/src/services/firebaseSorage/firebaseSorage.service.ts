import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "core";
import axios, { AxiosResponse } from 'axios';


class FirebaseSorage {
    upload = async (file: File): Promise<string> => {
        try {
            const reference = ref(storage, file.name);
            await uploadBytes(reference, file);
            return await getDownloadURL(reference);
        } catch (error: any) {
            throw error;
        }
    }
    download = async (url: string): Promise<ArrayBuffer> => {
        try {
            const response: AxiosResponse<ArrayBuffer> = await axios.get(url, { responseType: 'arraybuffer' });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export const firebaseSorage = new FirebaseSorage();