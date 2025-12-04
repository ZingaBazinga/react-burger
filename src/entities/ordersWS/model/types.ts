export interface IOrder {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: "done" | "created" | "pending" | "cancelled";
    updatedAt: string;
    _id: string;
}

export interface IOrdersResponse {
    success: boolean;
    orders: IOrder[];
    total: number;
    totalToday: number;
}
