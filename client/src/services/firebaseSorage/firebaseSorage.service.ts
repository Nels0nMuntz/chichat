import axios, { AxiosResponse } from 'axios';


class FirebaseSorage {
    load = async (url: string): Promise<ArrayBuffer> => {
        const response: AxiosResponse<ArrayBuffer> = await axios.get(url, { responseType: 'arraybuffer' });
        return response.data;
    }
}

export const firebaseSorage = new FirebaseSorage();