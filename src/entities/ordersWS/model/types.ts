export interface IOrder {
    ingredients: string[];
    _id: string;
    status: "done" | "created" | "pending" | "cancelled";
    number: number;
    createdAt: string;
    updatedAt: string;
}

export interface IOrdersResponse {
    success: boolean;
    orders: IOrder[];
    total: number;
    totalToday: number;
}
