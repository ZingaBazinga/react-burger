import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../utils/backend_api";

export const postAuthRegister = createAsyncThunk(
    "auth/register",
    async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const jsonData = await request("auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            console.log("postAuthRegister", jsonData);

            return jsonData.success;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    },
);

export const postAuthLogin = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const jsonData = await request("auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            console.log("postAuthRegister", jsonData);

            return jsonData.success;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    },
);

export const postAuthToken = createAsyncThunk("auth/token", async (_, { rejectWithValue }) => {
    try {
        const jsonData = await request("auth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("postAuthToken", jsonData);

        return jsonData.success;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
});

export const postAuthLogout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const jsonData = await request("auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("postAuthLogout", jsonData);

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
        console.log("getAuthUser", jsonData);

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
            console.log("patchAuthUser", jsonData);

            return jsonData.user;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    },
);

const authSlice = createSlice({
    name: "profile",
    initialState: {
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
    },
    reducers: {
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
                state.authRegisterFailed = false;
            })
            .addCase(postAuthRegister.fulfilled, (state, action) => {
                state.authRegisterRequest = false;
                state.authRegisterSuccess = action.payload.success;
            })
            .addCase(postAuthRegister.rejected, (state) => {
                state.authRegisterRequest = false;
                state.authRegisterFailed = true;
            })
            // ------------------------------------------------------------
            .addCase(postAuthLogin.pending, (state) => {
                state.authLoginRequest = true;
                state.authLoginFailed = false;
            })
            .addCase(postAuthLogin.fulfilled, (state, action) => {
                state.authLoginRequest = false;
                state.authLoginSuccess = action.payload.success;
            })
            .addCase(postAuthLogin.rejected, (state) => {
                state.authLoginRequest = false;
                state.authLoginFailed = true;
            })
            // ------------------------------------------------------------
            .addCase(postAuthToken.pending, (state) => {
                state.authTokenRequest = true;
                state.authTokenFailed = false;
            })
            .addCase(postAuthToken.fulfilled, (state, action) => {
                state.authTokenRequest = false;
                state.authTokenSuccess = action.payload.success;
            })
            .addCase(postAuthToken.rejected, (state) => {
                state.authTokenRequest = false;
                state.authTokenFailed = true;
            })
            // ------------------------------------------------------------
            .addCase(postAuthLogout.pending, (state) => {
                state.authLogoutRequest = true;
                state.authLogoutFailed = false;
            })
            .addCase(postAuthLogout.fulfilled, (state, action) => {
                state.authLogoutRequest = false;
                state.authLogoutSuccess = action.payload.success;
            })
            .addCase(postAuthLogout.rejected, (state) => {
                state.authLogoutRequest = false;
                state.authLogoutFailed = true;
            });
    },
});

export const { resetAuthRegister } = authSlice.actions;
export default authSlice.reducer;
