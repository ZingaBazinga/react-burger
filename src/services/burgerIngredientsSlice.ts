import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EIngredientType, IIngredient } from "../entities/ingredient";
import { backendApi } from "../utils/backend_api";

export const getBurgerIngredients = createAsyncThunk("/api/ingredients", async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`${backendApi}/api/ingredients`);
        if (res.ok) {
            const jsonData = await res.json();
            return jsonData.data;
        } else {
            return rejectWithValue(`Ошибка ${res.status}`);
        }
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
});

const burgerIngredientsSlice = createSlice({
    name: "burgerIngredients",
    initialState: {
        burgerIngredients: [] as IIngredient[],
        burgerIngredientsRequest: false,
        burgerIngredientsFailed: false,
        burgerIngredientsTab: EIngredientType.bun,
    },
    reducers: {
        switchBurgerIngredientsTab: (state, action) => {
            if (Object.values(EIngredientType).includes(action.payload)) {
                state.burgerIngredientsTab = action.payload;
            }
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

export const { switchBurgerIngredientsTab } = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
