import axios from "axios";
import { ISignInResponse } from "features/auth/models";
import { localStorageService } from "services";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const accessToken = localStorageService.getAccessToken();
        if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
    },
    error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) {           
            const originRequest = error.config;
            try {
                const { status, data } = await axios.get<ISignInResponse>("http://localhost:3000/api/auth/refresh", { withCredentials: true });
                if (status !== 200 || !data.accessToken) {
                    throw new Error("Authorization error");
                }
                localStorageService.setAccessToken(data.accessToken);
                return axiosInstance.request(originRequest);
            } catch (error: any) {
                console.log(error.message);
                return Promise.reject(error);
            };
        };
        return Promise.reject(error);
    },
);