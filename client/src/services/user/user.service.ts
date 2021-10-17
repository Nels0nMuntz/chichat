import { AxiosInstance, AxiosResponse } from "axios";
import { axiosInstance } from "core";
import { IFetchUserDataResponse } from "features/home/models";


class UserService {

    private axios: AxiosInstance;
    private baseUrl: string;

    constructor(){
        this.axios = axiosInstance;
        this.baseUrl = "/api/user";
    }

    getUserData = async (): Promise<AxiosResponse<IFetchUserDataResponse>> => {
        try {
            return await this.axios.get<IFetchUserDataResponse>(this.baseUrl);
        } catch (error: any) {
            throw error.response.data.error;
        }
    }

};

export const userService = new UserService();