import axios from 'axios';

import { axiosInstance } from 'core';
import { ISignInRequest, ISignInResponse, ISignUpRequest } from 'features/auth/models';


class AuthService {
    private axios: typeof axiosInstance;
    private baseUrl: string;

    constructor(){
        this.axios = axiosInstance;
        this.baseUrl = "/api/auth";
    }

    public signin = async (data: ISignInRequest) => {
        try {
            return await this.axios.post<ISignInResponse>(`${this.baseUrl}/signin`, data)
        } catch (error: any) {
            throw error.response.data.error;
        }
    }

    public signup = async (data: ISignUpRequest) => {
        try {
            return await this.axios.post(`${this.baseUrl}/signup`, data)
        } catch (error: any) {
            throw error.response.data.error;
        }
    }

    public checkAuth = async () => {
        try {
            return await axios.get<ISignInResponse>(`${this.baseUrl}/refresh`, { 
                baseURL: "http://localhost:3000",
                withCredentials: true 
            });
        } catch (error: any) {
            throw error.response.data.error;
        }
    }
};

export const authService = new AuthService();