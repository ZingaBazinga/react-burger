import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../utils/backend_api";

export const postOrder = createAsyncThunk("orders", async (order: { ingredients: string[] }, { rejectWithValue }) => {
    try {
        const jsonData = await request("orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
        return jsonData.order.number;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
});

const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: {
        orderDetailsNumber: null,
        orderDetailsNumberRequest: false,
        orderDetailsNumberFailed: false,
    },
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetailsNumber = null;
            state.orderDetailsNumberRequest = false;
            state.orderDetailsNumberFailed = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postOrder.pending, (state) => {
                state.orderDetailsNumberRequest = true;
                state.orderDetailsNumberFailed = false;
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.orderDetailsNumberRequest = false;
                state.orderDetailsNumber = action.payload;
            })
            .addCase(postOrder.rejected, (state) => {
                state.orderDetailsNumberRequest = false;
                state.orderDetailsNumberFailed = true;
            });
    },
});

export const { resetOrderDetails } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
