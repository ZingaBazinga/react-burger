import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient, IConstructorIngredient } from "../entities/ingredient";
import { v4 as uuidv4 } from "uuid";

const burgerConstructorSlice = createSlice({
    name: "burgerConstructor",
    initialState: {
        constructorItems: [] as IConstructorIngredient[],
    },
    reducers: {
        addBurgerConstructor: {
            reducer: (state, action: PayloadAction<IConstructorIngredient>) => {
                state.constructorItems = [...state.constructorItems, action.payload];
            },
            prepare: (ingredient: IIngredient) => {
                return { payload: { ...ingredient, uniqueId: uuidv4() } };
            },
        },
        replaceBurgerConstructor: {
            reducer: (state, action: PayloadAction<IConstructorIngredient>) => {
                const newConstructorItems = state.constructorItems.map((item: IConstructorIngredient) =>
                    item.type === "bun" ? action.payload : item,
                );
                state.constructorItems = newConstructorItems;
            },
            prepare: (ingredient: IIngredient) => {
                return { payload: { ...ingredient, uniqueId: uuidv4() } };
            },
        },
        deleteBurgerConstructor: (state, action) => {
            state.constructorItems.splice(action.payload.index, 1);
        },
        moveBurgerConstructor: (state, action) => {
            const { dragIndex, hoverIndex } = action.payload;
            const newItems = [...state.constructorItems];
            const draggedItem = newItems.splice(dragIndex, 1)[0];
            newItems.splice(hoverIndex, 0, draggedItem);
            state.constructorItems = newItems;
        },
    },
});

export const { addBurgerConstructor, replaceBurgerConstructor, deleteBurgerConstructor, moveBurgerConstructor } =
    burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
