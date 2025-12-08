import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../entities/ordersWS";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderItems: null as IOrder | null,
    },
    reducers: {
        setOrder: (state, action: PayloadAction<IOrder | null>) => {
            state.orderItems = action.payload;
        },
        resetOrder: (state) => {
            state.orderItems = null;
        },
    },
});

export const { setOrder, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
