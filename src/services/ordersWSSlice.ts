// ordersWSSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { wsClose, wsError, wsMessage, wsOpen } from "./middleware/action-types";
import { IOrder, IOrdersResponse } from "../entities/ordersWS";

interface OrdersWSState {
    isConnected: boolean;
    error: string | null;
    orders: IOrdersResponse | null; // замените на ваш тип
}

const initialState: OrdersWSState = {
    isConnected: false,
    error: null,
    orders: null,
};

const ordersWSSlice = createSlice({
    name: "ordersWS",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders = action.payload;
        },
        clearOrders: (state) => {
            state.orders = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(wsOpen, (state) => {
                state.isConnected = true;
                state.error = null;
            })
            .addCase(wsMessage, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(wsError, (state, action) => {
                state.error = action.payload;
                state.isConnected = false;
            })
            .addCase(wsClose, (state) => {
                state.isConnected = false;
            });
    },
});

export const { addOrder, clearOrders } = ordersWSSlice.actions;
export default ordersWSSlice.reducer;
