import reducer, { postOrder, resetOrderDetails } from "./orderDetailsSlice";

describe("orderDetailsSlice reducer", () => {
    const initialState = {
        orderDetailsNumber: null,
        orderDetailsNumberRequest: false,
        orderDetailsNumberFailed: false,
    };

    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("should handle resetOrderDetails", () => {
        const startState = {
            orderDetailsNumber: 1234,
            orderDetailsNumberRequest: true,
            orderDetailsNumberFailed: true,
        };

        expect(reducer(startState, resetOrderDetails())).toEqual(initialState);
    });

    it("should handle postOrder.pending", () => {
        const state = reducer(initialState, { type: postOrder.pending.type });
        expect(state.orderDetailsNumberRequest).toBe(true);
        expect(state.orderDetailsNumberFailed).toBe(false);
    });

    it("should handle postOrder.fulfilled", () => {
        const payload = 9999;
        const state = reducer(initialState, { type: postOrder.fulfilled.type, payload });

        expect(state.orderDetailsNumberRequest).toBe(false);
        expect(state.orderDetailsNumber).toBe(payload);
    });

    it("should handle postOrder.rejected", () => {
        const state = reducer(initialState, { type: postOrder.rejected.type });

        expect(state.orderDetailsNumberRequest).toBe(false);
        expect(state.orderDetailsNumberFailed).toBe(true);
    });
});
