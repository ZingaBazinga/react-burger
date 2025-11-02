import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../utils/backend_api";
import { IProfile } from "../entities/profile";

export const postPasswordReset = createAsyncThunk("password-reset", async (email: string, { rejectWithValue }) => {
    try {
        const jsonData = await request("password-reset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        return jsonData.success;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
});

export const postPasswordResetReset = createAsyncThunk(
    "password-reset/reset",
    async ({ password, token }: { password: string; token: string }, { rejectWithValue }) => {
        try {
            const jsonData = await request("password-reset/reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password, token }),
            });
            return jsonData.success;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    },
);

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
            return jsonData.success;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    },
);

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profileData: null as IProfile | null,
        passwordResetSuccess: false,
        passwordResetRequest: false,
        passwordResetFailed: false,
        passwordResetResetSuccess: false,
        passwordResetResetRequest: false,
        passwordResetResetFailed: false,
        authRegisterSuccess: false,
        authRegisterRequest: false,
        authRegisterFailed: false,
    },
    reducers: {
        setProfileData: (state, action) => {
            state.profileData = action.payload;
        },
        resetProfileData: (state) => {
            state.profileData = null;
        },
        resetPasswordReset: (state) => {
            state.passwordResetSuccess = false;
            state.passwordResetRequest = false;
            state.passwordResetFailed = false;
        },
        resetPasswordResetReset: (state) => {
            state.passwordResetResetSuccess = false;
            state.passwordResetResetRequest = false;
            state.passwordResetResetFailed = false;
        },
        resetAuthRegister: (state) => {
            state.authRegisterSuccess = false;
            state.authRegisterRequest = false;
            state.authRegisterFailed = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postPasswordReset.pending, (state) => {
                state.passwordResetRequest = true;
                state.passwordResetFailed = false;
            })
            .addCase(postPasswordReset.fulfilled, (state, action) => {
                state.passwordResetRequest = false;
                state.passwordResetSuccess = action.payload;
            })
            .addCase(postPasswordReset.rejected, (state) => {
                state.passwordResetRequest = false;
                state.passwordResetFailed = true;
            })

            .addCase(postPasswordResetReset.pending, (state) => {
                state.passwordResetRequest = true;
                state.passwordResetFailed = false;
            })
            .addCase(postPasswordResetReset.fulfilled, (state, action) => {
                state.passwordResetRequest = false;
                state.passwordResetSuccess = action.payload;
            })
            .addCase(postPasswordResetReset.rejected, (state) => {
                state.passwordResetRequest = false;
                state.passwordResetFailed = true;
            })

            .addCase(postAuthRegister.pending, (state) => {
                state.authRegisterRequest = true;
                state.authRegisterFailed = false;
            })
            .addCase(postAuthRegister.fulfilled, (state, action) => {
                state.authRegisterRequest = false;
                state.authRegisterSuccess = action.payload;
            })
            .addCase(postAuthRegister.rejected, (state) => {
                state.authRegisterRequest = false;
                state.authRegisterFailed = true;
            });
    },
});

export const { resetPasswordReset, resetPasswordResetReset, resetAuthRegister } = profileSlice.actions;
export default profileSlice.reducer;
