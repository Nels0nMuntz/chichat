import { AxiosInstance, AxiosResponse } from "axios";
import { axiosInstance } from "core";
import { IFetchUserDataResponse, ISidebarSearchParams } from "features/home/models";
import { IUser } from "shared";


class UserService {

    private axios: AxiosInstance;
    private baseUrl: string;

    constructor() {
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

    search = async (data: ISidebarSearchParams): Promise<AxiosResponse<Array<IUser>>> => {
        try {
            return await this.axios.get<Array<IUser>>(this.baseUrl + `/search?query=${data.query}&internal=${data.internal}`);
        } catch (error: any) {
            throw error.response.data.error;
        };
    }

};

export const userService = new UserService();