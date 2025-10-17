import { createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../entities/ingredient";

const burgerConstructorSlice = createSlice({
    name: "burgerConstructor",
    initialState: {
        constructorItems: [] as IIngredient[],
    },
    reducers: {
        addBurgerConstructor: (state, action) => {
            state.constructorItems = [...state.constructorItems, action.payload];
        },
        replaceBurgerConstructor: (state, action) => {
            const newConstructorItems = state.constructorItems.map((item) => (item.type === "bun" ? action.payload : item));
            state.constructorItems = newConstructorItems;
        },
        deleteBurgerConstructor: (state, action) => {
            state.constructorItems.splice(action.payload.index, 1);
        },
        moveBurgerConstructor: (state, action) => {
            const { dragIndex, hoverIndex } = action.payload;
            const newItems = [...state.constructorItems];
            const draggedItem = newItems.splice(dragIndex, 1)[0]; // удаляем и получаем элемент
            newItems.splice(hoverIndex, 0, draggedItem); // вставляем в новую позицию
            state.constructorItems = newItems;
        },
    },
});

export const { addBurgerConstructor, replaceBurgerConstructor, deleteBurgerConstructor, moveBurgerConstructor } =
    burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
