import { AxiosInstance, AxiosResponse } from "axios";
import { axiosInstance } from "core";
import { 
    ISearchMessagesResponse, 
    ISidebarSearchParams,
    IDeleteMessagesRequest,
} from "features/home/models";


class MessagesService {

    private axios: AxiosInstance;
    private baseUrl: string;

    constructor(){
        this.axios = axiosInstance;
        this.baseUrl = "/api/messages";
    }

    search = async (params: ISidebarSearchParams): Promise<AxiosResponse<ISearchMessagesResponse>> => {
        try {
            return await this.axios.get<ISearchMessagesResponse>(this.baseUrl + `/search`, { params });
        } catch (error: any) {
            throw error.response.data.error;
        }
    }

    deleteMany = async (data: IDeleteMessagesRequest): Promise<AxiosResponse<void>> => {
        try {
            return await this.axios.delete<void>(this.baseUrl + '/deleteMany', { data });
        } catch (error: any) {
            throw error.response.data.error;
        };
    }

}

export const messageService = new MessagesService();