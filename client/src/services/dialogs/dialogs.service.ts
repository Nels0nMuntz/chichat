import { AxiosInstance, AxiosResponse } from "axios";
import { axiosInstance } from "core";
import { IFetchDialogsResponse } from "features/home/models";


class DialogsService {

    private axios: AxiosInstance;
    private baseUrl: string;

    constructor(){
        this.axios = axiosInstance;
        this.baseUrl = "/api/dialogs";
    }

    fetchAll = async (): Promise<AxiosResponse<IFetchDialogsResponse>> => {
        try {
            return await this.axios.get<IFetchDialogsResponse>(this.baseUrl + "/all");
        } catch (error: any) {
            throw error.response.data.error;
        }
    }

};

export const dialogsService = new DialogsService();