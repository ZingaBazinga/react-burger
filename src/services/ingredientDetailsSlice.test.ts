import reducer, { setIngredientDetails, resetIngredientDetails } from "./ingredientDetailsSlice";
import { IIngredient } from "../entities/ingredient";

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

describe("ingredientDetailsSlice reducer", () => {
    const initialState = { ingredientDetails: null as IIngredient | null };

    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("should handle setIngredientDetails", () => {
        const ingredient = makeIngredient({ _id: "1", name: "Bun" });
        const state = reducer(initialState, setIngredientDetails(ingredient));

        expect(state.ingredientDetails).toEqual(ingredient);
    });

    it("should handle resetIngredientDetails", () => {
        const ingredient = makeIngredient({ _id: "1" });
        const startState = { ingredientDetails: ingredient };

        const state = reducer(startState, resetIngredientDetails());
        expect(state.ingredientDetails).toBeNull();
    });
});
