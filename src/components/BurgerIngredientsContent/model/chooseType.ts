import { EIngredientType } from "../../../entities/ingredient";

export function chooseType(type: EIngredientType) {
    switch (type) {
        case EIngredientType.bun: {
            return "Булки";
        }
        case EIngredientType.sauce: {
            return "Соусы";
        }
        case EIngredientType.main: {
            return "Начинки";
        }
    }
}
