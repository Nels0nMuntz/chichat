import { axiosInstance } from '../../core/axiosInstance';
import { ISignInRequest } from 'features/auth/models';


class AuthService {
    private axios: typeof axiosInstance;

    constructor(){
        this.axios = axiosInstance;
    }

    public signin = async (data: ISignInRequest) => {
        try {
            return await this.axios.post("/api/auth/signin", data)
        } catch (error: any) {
            throw error.response.data
        }
    }
};

export const authService = new AuthService();