import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../entities/ordersWS";
import { request } from "../utils/backend_api";

export const getOrder = createAsyncThunk("orders", async (id: string, { rejectWithValue }) => {
    try {
        const jsonData = await request(`orders/${id}`);
        return jsonData.orders[0];
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
});

export const initialState = {
    orderItems: null as IOrder | null,
    orderItemsRequest: false,
    orderItemsFailed: false,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<IOrder | null>) => {
            state.orderItems = action.payload;
        },
        resetOrder: (state) => {
            state.orderItems = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrder.pending, (state) => {
                state.orderItemsRequest = true;
                state.orderItemsFailed = false;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.orderItemsRequest = false;
                state.orderItems = action.payload;
            })
            .addCase(getOrder.rejected, (state) => {
                state.orderItemsRequest = false;
                state.orderItemsFailed = true;
            });
    },
});

export const { setOrder, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
