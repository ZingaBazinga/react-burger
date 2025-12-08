import { IRefreshTokenResponse } from "../entities/profile";

export const BASE_URL = "http://norma.education-services.ru/api/";
export const WS_BASE_URL = "wss://norma.education-services.ru";

interface IApiSuccessResponse {
    success: boolean;
    data: unknown;
}

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject({ status: res.status, message: `Ошибка ${res.status}` });
};

const checkSuccess = <T extends IApiSuccessResponse>(res: T) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Ответ не success: ${res}`);
};

const refreshToken = async () => {
    try {
        const response = await fetch(`${BASE_URL}auth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
        });
        const checkedResponse = await checkResponse(response);
        const jsonData: IRefreshTokenResponse = await checkSuccess(checkedResponse);
        localStorage.setItem("accessToken", jsonData.accessToken);
        localStorage.setItem("refreshToken", jsonData.refreshToken);
        return jsonData.success;
    } catch (error) {
        return Promise.reject(error);
    }
};

export function request(endpoint: string, options?: RequestInit) {
    const makeRequest = () => {
        return fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...options?.headers,
                Authorization: `${localStorage.getItem("accessToken")}`,
            },
        })
            .then(checkResponse)
            .then(checkSuccess);
    };

    return makeRequest().catch((error: { status: number; message: string }) => {
        if (error.status === 403) {
            return refreshToken().then(() => {
                return makeRequest();
            });
        }
        return Promise.reject(error.message);
    });
}
