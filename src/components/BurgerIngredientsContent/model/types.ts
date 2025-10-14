import { EIngredientType, IIngredient } from "../../../entities/ingredient";

export interface BurgerIngredientsContentProps {
    type: EIngredientType;
    ingredient: IIngredient[];
}
