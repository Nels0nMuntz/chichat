import { AxiosInstance, AxiosResponse } from "axios";
import { axiosInstance } from "core";
import { IFetchAllDialogsResponse, IFetchAllMessagesRequest, IFetchAllMessagesResponse } from "features/home/models";


class DialogsService {

    private axios: AxiosInstance;
    private baseUrl: string;

    constructor(){
        this.axios = axiosInstance;
        this.baseUrl = "/api/dialogs";
    }

    fetchAllDialogs = async (): Promise<AxiosResponse<IFetchAllDialogsResponse>> => {
        try {
            return await this.axios.get<IFetchAllDialogsResponse>(this.baseUrl + "/all");
        } catch (error: any) {
            throw error.response.data.error;
        }
    }

    fetchAllMessages = async (data: IFetchAllMessagesRequest) : Promise<AxiosResponse<IFetchAllMessagesResponse>> => {
        try {
            return await this.axios.get(this.baseUrl + `?id=${data.dialogId}&offset=${data.offset}&limit=${data.limit}`);
        } catch (error: any) {
            throw error.response.data.error;
        }
    }

};

export const dialogsService = new DialogsService();