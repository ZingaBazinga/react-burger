// store.ts
import { configureStore } from "@reduxjs/toolkit";
import burgerConstructorReducer from "./burgerConstructorSlice";
import burgerIngredientsReducer from "./burgerIngredientsSlice";
import ingredientDetailsReducer from "./ingredientDetailsSlice";
import orederDetailsReducer from "./orderDetailsSlice";
import profileReducer from "./profileSlice";
import authReducer from "./authSlice";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { wsConnect, wsDisconnect } from "./middleware/action-types";
import ordersWSSlice from "./ordersWSSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        burgerConstructor: burgerConstructorReducer,
        burgerIngredients: burgerIngredientsReducer,
        ingredientDetails: ingredientDetailsReducer,
        orderDetails: orederDetailsReducer,
        profile: profileReducer,
        ordersWS: ordersWSSlice, // пример добавления редьюсера для WebSocket
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            socketMiddleware({
                connect: wsConnect.type,
                disconnect: wsDisconnect.type,
            }),
        ),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
