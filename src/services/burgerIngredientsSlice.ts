import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EIngredientType, IIngredient } from "../entities/ingredient";
import { request } from "../utils/backend_api";

export const getBurgerIngredients = createAsyncThunk("ingredients", async (_, { rejectWithValue }) => {
    try {
        const jsonData = await request("ingredients");
        return jsonData.data;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
});

export const initialState = {
    burgerIngredients: [] as IIngredient[],
    burgerIngredientsRequest: false,
    burgerIngredientsFailed: false,
    burgerIngredientsTab: EIngredientType.bun,
};

const burgerIngredientsSlice = createSlice({
    name: "burgerIngredients",
    initialState,
    reducers: {
        switchBurgerIngredientsTab: (state, action) => {
            if (Object.values(EIngredientType).includes(action.payload)) {
                state.burgerIngredientsTab = action.payload;
            }
        },
        incrementBurgerIngredients: (state, action) => {
            state.burgerIngredients = state.burgerIngredients.map((ingredient) => {
                if (ingredient._id === action.payload._id) {
                    return { ...ingredient, __v: ingredient.__v + 1 };
                }
                return { ...ingredient };
            });
        },
        decrementBurgerIngredients: (state, action) => {
            state.burgerIngredients = state.burgerIngredients.map((ingredient) => {
                if (ingredient._id === action.payload._id) {
                    return { ...ingredient, __v: ingredient.__v - 1 };
                }
                return { ...ingredient };
            });
        },
        resetBurgerIngredientsCounters: (state) => {
            state.burgerIngredients = state.burgerIngredients.map((ingredient) => ({
                ...ingredient,
                __v: 0,
            }));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBurgerIngredients.pending, (state) => {
                state.burgerIngredientsRequest = true;
                state.burgerIngredientsFailed = false;
            })
            .addCase(getBurgerIngredients.fulfilled, (state, action) => {
                state.burgerIngredientsRequest = false;
                state.burgerIngredients = action.payload;
            })
            .addCase(getBurgerIngredients.rejected, (state) => {
                state.burgerIngredientsRequest = false;
                state.burgerIngredientsFailed = true;
            });
    },
});

export const { switchBurgerIngredientsTab, incrementBurgerIngredients, decrementBurgerIngredients, resetBurgerIngredientsCounters } =
    burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
