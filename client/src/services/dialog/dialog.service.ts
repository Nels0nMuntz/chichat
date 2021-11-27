import { AxiosInstance, AxiosResponse } from "axios";
import { axiosInstance } from "core";
import { 
    ICreateDialogRequest, 
    IDialogResponse, 
    IFetchAllDialogsResponse,
} from "features/home/models";


class DialogService {

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

    createDialog = async (data: ICreateDialogRequest): Promise<AxiosResponse<IDialogResponse>> => {
        try {
            return await this.axios.post<IDialogResponse>(this.baseUrl + '/create', data);
        } catch (error: any) {
            throw error.response.data.error;
        }
    }

};

export const dialogService = new DialogService();