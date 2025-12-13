import reducer, { addOrder, clearOrders } from "./ordersWSSlice";
import { wsOpen, wsMessage, wsError, wsClose } from "./middleware/action-types";
import { IOrdersResponse } from "../entities/ordersWS";

const makeOrdersResponse = (overrides: Partial<IOrdersResponse> = {}): IOrdersResponse => ({
    success: true,
    orders: [],
    total: 0,
    totalToday: 0,
    ...overrides,
});

describe("ordersWSSlice reducer", () => {
    const initialState = {
        isConnected: false,
        error: null as string | null,
        orders: null as IOrdersResponse | null,
    };

    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("should handle addOrder", () => {
        const payload = makeOrdersResponse({ total: 5 });
        const state = reducer(initialState, addOrder(payload));
        expect(state.orders).toEqual(payload);
    });

    it("should handle clearOrders", () => {
        const payload = makeOrdersResponse({ total: 2 });
        const startState = { ...initialState, orders: payload };
        const state = reducer(startState, clearOrders());
        expect(state.orders).toBeNull();
    });

    it("should handle wsOpen", () => {
        const state = reducer(initialState, wsOpen());
        expect(state.isConnected).toBe(true);
        expect(state.error).toBeNull();
    });

    it("should handle wsMessage", () => {
        const payload = makeOrdersResponse({ total: 10 });
        const state = reducer(initialState, wsMessage(payload));
        expect(state.orders).toEqual(payload);
    });

    it("should handle wsError", () => {
        const state = reducer(initialState, wsError("fail"));
        expect(state.error).toBe("fail");
        expect(state.isConnected).toBe(false);
    });

    it("should handle wsClose", () => {
        const startState = { ...initialState, isConnected: true };
        const state = reducer(startState, wsClose());
        expect(state.isConnected).toBe(false);
    });
});
