import { configureStore } from "@reduxjs/toolkit";
import burgerConstructorReducer from "./burgerConstructorSlice";
import burgerIngredientsReducer from "./burgerIngredientsSlice";
import ingredientDetailsReducer from "./ingredientDetailsSlice";
import orederDetailsReducer from "./orderDetailsSlice";

export const store = configureStore({
    reducer: {
        burgerConstructo: burgerConstructorReducer,
        burgerIngredients: burgerIngredientsReducer,
        ingredientDetails: ingredientDetailsReducer,
        orderDetails: orederDetailsReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
