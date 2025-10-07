import { chooseType } from "..";
import { EIngredientType, IIngredient } from "../../../entities/ingredient";
import { BurgerIngredientCard } from "../../BurgerIngredientCard";
import styles from "./BurgerIngredientsContent.module.css";

export function BurgerIngredientsContent({ type, ingredient }: { type: EIngredientType; ingredient: IIngredient[] }) {
    return (
        <div className={`${styles.ingredients_container}`}>
            <h2 className={`text text_type_main-medium`}>{chooseType(type)}</h2>
            <div className={styles.cards}>
                {ingredient.map((ingredient: IIngredient) => (
                    <BurgerIngredientCard {...ingredient} key={ingredient._id} />
                ))}
            </div>
        </div>
    );
}
