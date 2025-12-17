import reducer, {
    addBurgerConstructor,
    replaceBurgerConstructor,
    deleteBurgerConstructor,
    moveBurgerConstructor,
    clearBurgerConstructor,
    initialState,
} from "./burgerConstructorSlice";
import { IIngredient, IConstructorIngredient } from "../entities/ingredient";

jest.mock("uuid", () => ({
    v4: jest.fn(),
}));

const { v4: mockUuid } = jest.requireMock("uuid");

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

const withUid = (ingredient: IIngredient, uniqueId: string): IConstructorIngredient => ({
    ...ingredient,
    uniqueId,
});

describe("burgerConstructorSlice reducer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("should handle addBurgerConstructor", () => {
        mockUuid.mockReturnValueOnce("uuid-1");
        const bun = makeIngredient({ type: "bun", name: "Bun" });

        expect(reducer(undefined, addBurgerConstructor(bun))).toEqual({
            constructorItems: [withUid(bun, "uuid-1")],
        });

        mockUuid.mockReturnValueOnce("uuid-2");
        const sauce = makeIngredient({ type: "sauce", name: "Sauce" });
        const startState = { constructorItems: [withUid(bun, "uuid-1")] };

        expect(reducer(startState, addBurgerConstructor(sauce))).toEqual({
            constructorItems: [withUid(bun, "uuid-1"), withUid(sauce, "uuid-2")],
        });
    });

    it("should handle replaceBurgerConstructor for bun", () => {
        mockUuid.mockReturnValueOnce("uuid-new-bun");
        const oldBun = withUid(makeIngredient({ type: "bun", name: "Old Bun" }), "uuid-old-bun");
        const filling = withUid(makeIngredient({ type: "main", name: "Patty" }), "uuid-main");
        const newBun = makeIngredient({ type: "bun", name: "New Bun" });
        const startState = { constructorItems: [oldBun, filling] };

        expect(reducer(startState, replaceBurgerConstructor(newBun))).toEqual({
            constructorItems: [withUid(newBun, "uuid-new-bun"), filling],
        });
    });

    it("should handle deleteBurgerConstructor", () => {
        const bun = withUid(makeIngredient({ type: "bun" }), "uuid-1");
        const sauce = withUid(makeIngredient({ type: "sauce" }), "uuid-2");
        const startState = { constructorItems: [bun, sauce] };

        expect(reducer(startState, deleteBurgerConstructor({ index: 0 }))).toEqual({
            constructorItems: [sauce],
        });
    });

    it("should handle moveBurgerConstructor", () => {
        const first = withUid(makeIngredient({ name: "First" }), "uuid-1");
        const second = withUid(makeIngredient({ name: "Second" }), "uuid-2");
        const third = withUid(makeIngredient({ name: "Third" }), "uuid-3");
        const startState = { constructorItems: [first, second, third] };

        expect(reducer(startState, moveBurgerConstructor({ dragIndex: 0, hoverIndex: 2 }))).toEqual({
            constructorItems: [second, third, first],
        });
    });

    it("should handle clearBurgerConstructor", () => {
        const bun = withUid(makeIngredient({ type: "bun" }), "uuid-1");
        const startState = { constructorItems: [bun] };

        expect(reducer(startState, clearBurgerConstructor())).toEqual({
            constructorItems: [],
        });
    });
});
