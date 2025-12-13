import reducer, {
    getBurgerIngredients,
    switchBurgerIngredientsTab,
    incrementBurgerIngredients,
    decrementBurgerIngredients,
    resetBurgerIngredientsCounters,
} from "./burgerIngredientsSlice";
import { EIngredientType, IIngredient } from "../entities/ingredient";

const makeIngredient = (overrides: Partial<IIngredient> = {}): IIngredient => ({
    _id: "id",
    name: "Ingredient",
    type: "main",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 1,
    image: "image",
    image_mobile: "image_mobile",
    image_large: "image_large",
    __v: 0,
    ...overrides,
});

describe("burgerIngredientsSlice reducer", () => {
    const initialState = {
        burgerIngredients: [] as IIngredient[],
        burgerIngredientsRequest: false,
        burgerIngredientsFailed: false,
        burgerIngredientsTab: EIngredientType.bun,
    };

    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("should handle switchBurgerIngredientsTab with valid value", () => {
        const state = reducer(initialState, switchBurgerIngredientsTab(EIngredientType.sauce));
        expect(state.burgerIngredientsTab).toBe(EIngredientType.sauce);
    });

    it("should ignore switchBurgerIngredientsTab with invalid value", () => {
        const state = reducer(initialState, switchBurgerIngredientsTab("invalid"));
        expect(state.burgerIngredientsTab).toBe(EIngredientType.bun);
    });

    it("should handle incrementBurgerIngredients", () => {
        const ingredient = makeIngredient({ _id: "1", __v: 1 });
        const startState = { ...initialState, burgerIngredients: [ingredient] };

        const state = reducer(startState, incrementBurgerIngredients(ingredient));
        expect(state.burgerIngredients[0].__v).toBe(2);
    });

    it("should handle decrementBurgerIngredients", () => {
        const ingredient = makeIngredient({ _id: "1", __v: 2 });
        const startState = { ...initialState, burgerIngredients: [ingredient] };

        const state = reducer(startState, decrementBurgerIngredients(ingredient));
        expect(state.burgerIngredients[0].__v).toBe(1);
    });

    it("should handle resetBurgerIngredientsCounters", () => {
        const first = makeIngredient({ _id: "1", __v: 3 });
        const second = makeIngredient({ _id: "2", __v: 5 });
        const startState = { ...initialState, burgerIngredients: [first, second] };

        const state = reducer(startState, resetBurgerIngredientsCounters());
        expect(state.burgerIngredients.every((item) => item.__v === 0)).toBe(true);
    });

    it("should handle getBurgerIngredients.pending", () => {
        const state = reducer(initialState, { type: getBurgerIngredients.pending.type });
        expect(state.burgerIngredientsRequest).toBe(true);
        expect(state.burgerIngredientsFailed).toBe(false);
    });

    it("should handle getBurgerIngredients.fulfilled", () => {
        const payload = [makeIngredient({ _id: "1" })];
        const state = reducer(initialState, { type: getBurgerIngredients.fulfilled.type, payload });

        expect(state.burgerIngredientsRequest).toBe(false);
        expect(state.burgerIngredients).toEqual(payload);
    });

    it("should handle getBurgerIngredients.rejected", () => {
        const state = reducer(initialState, { type: getBurgerIngredients.rejected.type });

        expect(state.burgerIngredientsRequest).toBe(false);
        expect(state.burgerIngredientsFailed).toBe(true);
    });
});
