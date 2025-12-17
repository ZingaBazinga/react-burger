import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../utils/backend_api";
import { IAuthRegisterResponse, IProfileData } from "../entities/profile";

export const postAuthRegister = createAsyncThunk(
    "auth/register",
    async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const jsonData: IAuthRegisterResponse = await request("auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            localStorage.setItem("accessToken", jsonData.accessToken);
            localStorage.setItem("refreshToken", jsonData.refreshToken);

            return jsonData.user;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    },
);

export const postAuthLogin = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const jsonData: IAuthRegisterResponse = await request("auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            localStorage.setItem("accessToken", jsonData.accessToken);
            localStorage.setItem("refreshToken", jsonData.refreshToken);

            return jsonData.user;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    },
);

export const postAuthLogout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const jsonData = await request("auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        return jsonData.success;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
});

export const getAuthUser = createAsyncThunk("auth/user", async (_, { rejectWithValue }) => {
    try {
        const jsonData = await request("auth/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return jsonData.user;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
});

export const patchAuthUser = createAsyncThunk(
    "auth/user",
    async ({ data }: { data: { name: string; email: string; password: string } }, { rejectWithValue }) => {
        try {
            const jsonData = await request("auth/user", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            return jsonData.user;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    },
);

export const initialState = {
    user: null as IProfileData | null,
    userRequest: false,
    userFailed: false,
    userSuccess: false,
    // ------------------------------------------------------------
    authRegisterSuccess: false,
    authRegisterRequest: false,
    authRegisterFailed: false,
    // ------------------------------------------------------------
    authLoginSuccess: false,
    authLoginRequest: false,
    authLoginFailed: false,
    // ------------------------------------------------------------
    authTokenSuccess: false,
    authTokenRequest: false,
    authTokenFailed: false,
    // ------------------------------------------------------------
    authLogoutSuccess: false,
    authLogoutRequest: false,
    authLogoutFailed: false,
};

const authSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IProfileData>) => {
            state.user = action.payload;
        },
        resetUser: (state) => {
            state.user = null;
        },
        resetAuthRegister: (state) => {
            state.authRegisterSuccess = false;
            state.authRegisterRequest = false;
            state.authRegisterFailed = false;
        },
        resetAuthLogin: (state) => {
            state.authLoginSuccess = false;
            state.authLoginRequest = false;
            state.authLoginFailed = false;
        },
        resetAuthToken: (state) => {
            state.authTokenSuccess = false;
            state.authTokenRequest = false;
            state.authTokenFailed = false;
        },
        resetAuthLogout: (state) => {
            state.authLogoutSuccess = false;
            state.authLogoutRequest = false;
            state.authLogoutFailed = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postAuthRegister.pending, (state) => {
                state.authRegisterRequest = true;
                state.authRegisterSuccess = false;
                state.authRegisterFailed = false;
            })
            .addCase(postAuthRegister.fulfilled, (state, action) => {
                state.authRegisterRequest = false;
                state.authRegisterSuccess = true;
                state.authRegisterFailed = false;
                state.user = action.payload;
            })
            .addCase(postAuthRegister.rejected, (state) => {
                state.authRegisterRequest = false;
                state.authRegisterSuccess = false;
                state.authRegisterFailed = true;
            })
            // ------------------------------------------------------------
            .addCase(postAuthLogin.pending, (state) => {
                state.authLoginRequest = true;
                state.authLoginSuccess = false;
                state.authLoginFailed = false;
            })
            .addCase(postAuthLogin.fulfilled, (state, action) => {
                state.authLoginRequest = false;
                state.authLoginSuccess = true;
                state.authLoginFailed = false;
                state.user = action.payload;
            })
            .addCase(postAuthLogin.rejected, (state) => {
                state.authLoginRequest = false;
                state.authLoginSuccess = false;
                state.authLoginFailed = true;
            })
            // ------------------------------------------------------------
            .addCase(postAuthLogout.pending, (state) => {
                state.authLogoutRequest = true;
                state.authLogoutSuccess = false;
                state.authLogoutFailed = false;
            })
            .addCase(postAuthLogout.fulfilled, (state, action) => {
                state.authLogoutRequest = false;
                state.authLogoutSuccess = true;
                state.authLogoutFailed = false;
            })
            .addCase(postAuthLogout.rejected, (state) => {
                state.authLogoutRequest = false;
                state.authLogoutSuccess = false;
                state.authLogoutFailed = true;
            })
            // ------------------------------------------------------------
            .addCase(getAuthUser.pending, (state) => {
                state.userRequest = true;
                state.userFailed = false;
                state.userSuccess = false;
            })
            .addCase(getAuthUser.fulfilled, (state, action) => {
                state.userRequest = false;
                state.userFailed = false;
                state.userSuccess = true;
                state.user = action.payload;
            })
            .addCase(getAuthUser.rejected, (state) => {
                state.userRequest = false;
                state.userFailed = true;
                state.userSuccess = false;
            });
    },
});

export const { resetAuthRegister, resetAuthLogin, resetAuthToken, resetAuthLogout } = authSlice.actions;
export const { setUser, resetUser } = authSlice.actions;
export default authSlice.reducer;
