import { createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../entities/ingredient";

export const initialState = {
    ingredientDetails: null as IIngredient | null,
};

const ingredientDetailsSlice = createSlice({
    name: "ingredientDetails",
    initialState,
    reducers: {
        setIngredientDetails: (state, action) => {
            state.ingredientDetails = action.payload;
        },
        resetIngredientDetails: (state) => {
            state.ingredientDetails = null;
        },
    },
});

export const { setIngredientDetails, resetIngredientDetails } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
