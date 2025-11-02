export interface IAuthRegisterResponse {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
}

export interface IProfileData {
    email: string;
    name: string;
}

export interface IRefreshTokenResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}
