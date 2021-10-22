import { AxiosInstance, AxiosResponse } from "axios";
import { axiosInstance } from "core";
import { ISearchMessagesResponse, ISidebarSearchParams } from "features/home/models";


class MessagesService {

    private axios: AxiosInstance;
    private baseUrl: string;

    constructor(){
        this.axios = axiosInstance;
        this.baseUrl = "/api/message";
    }

    search = async (params: ISidebarSearchParams): Promise<AxiosResponse<ISearchMessagesResponse>> => {
        try {
            return await this.axios.get<ISearchMessagesResponse>(this.baseUrl + `/search`, { params });
        } catch (error: any) {
            throw error.response.data.error;
        }
    }

}

export const messageService = new MessagesService();