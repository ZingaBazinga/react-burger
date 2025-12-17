import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../utils/backend_api";

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

export const initialState = {
    passwordResetSuccess: false,
    passwordResetRequest: false,
    passwordResetFailed: false,
    passwordResetResetSuccess: false,
    passwordResetResetRequest: false,
    passwordResetResetFailed: false,
    authRegisterSuccess: false,
    authRegisterRequest: false,
    authRegisterFailed: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
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
            });
    },
});

export const { resetPasswordReset, resetPasswordResetReset, resetAuthRegister } = profileSlice.actions;
export default profileSlice.reducer;
