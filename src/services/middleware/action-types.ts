// middleware/action-types.ts
import { createAction } from "@reduxjs/toolkit";
import { IOrdersResponse } from "../../entities/ordersWS";

export const wsOpen = createAction("ordersWS/open");
export const wsConnect = createAction<string>("ordersWS/connect");
export const wsDisconnect = createAction("ordersWS/disconnect");
export const wsMessage = createAction<IOrdersResponse>("ordersWS/message");
export const wsError = createAction<string>("ordersWS/error");
export const wsClose = createAction("ordersWS/close");
