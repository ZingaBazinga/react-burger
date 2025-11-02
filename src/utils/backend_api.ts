export const BASE_URL = "http://norma.education-services.ru/api/";

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res: any) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Ответ не success: ${res}`);
};

export function request(endpoint: string, options?: RequestInit) {
    return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse).then(checkSuccess);
}
