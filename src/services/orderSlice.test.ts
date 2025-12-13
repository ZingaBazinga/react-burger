import reducer, { getOrder, setOrder, resetOrder } from "./orderSlice";
import { IOrder } from "../entities/ordersWS";

const makeOrder = (overrides: Partial<IOrder> = {}): IOrder => ({
    createdAt: "2025-01-01T00:00:00.000Z",
    ingredients: ["a", "b"],
    name: "Order name",
    number: 1,
    status: "pending",
    updatedAt: "2025-01-01T00:00:00.000Z",
    _id: "order-id",
    ...overrides,
});

describe("orderSlice reducer", () => {
    const initialState = {
        orderItems: null as IOrder | null,
        orderItemsRequest: false,
        orderItemsFailed: false,
    };

    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("should handle setOrder", () => {
        const order = makeOrder({ number: 42 });
        const state = reducer(initialState, setOrder(order));

        expect(state.orderItems).toEqual(order);
    });

    it("should handle resetOrder", () => {
        const order = makeOrder({ number: 99 });
        const startState = { ...initialState, orderItems: order };

        const state = reducer(startState, resetOrder());
        expect(state.orderItems).toBeNull();
        expect(state.orderItemsRequest).toBe(false);
        expect(state.orderItemsFailed).toBe(false);
    });

    it("should handle getOrder.pending", () => {
        const state = reducer(initialState, { type: getOrder.pending.type });
        expect(state.orderItemsRequest).toBe(true);
        expect(state.orderItemsFailed).toBe(false);
    });

    it("should handle getOrder.fulfilled", () => {
        const order = makeOrder({ number: 7 });
        const state = reducer(initialState, { type: getOrder.fulfilled.type, payload: order });

        expect(state.orderItemsRequest).toBe(false);
        expect(state.orderItems).toEqual(order);
    });

    it("should handle getOrder.rejected", () => {
        const state = reducer(initialState, { type: getOrder.rejected.type });

        expect(state.orderItemsRequest).toBe(false);
        expect(state.orderItemsFailed).toBe(true);
    });
});
