import { forwardRef } from "react";
import { chooseType } from "..";
import { IIngredient } from "../../../entities/ingredient";
import { BurgerIngredientCard } from "../../BurgerIngredientCard";
import styles from "./BurgerIngredientsContent.module.css";
import { BurgerIngredientsContentProps } from "../model/types";

export const BurgerIngredientsContent = forwardRef<
  HTMLDivElement,
  BurgerIngredientsContentProps
>(({ type, ingredient }, ref) => {
  return (
    <div className={`${styles.ingredients_container}`} ref={ref}>
      <h2 className={`text text_type_main-medium`}>{chooseType(type)}</h2>
      <div className={styles.cards}>
        {ingredient.map((ingredient: IIngredient) => (
          <BurgerIngredientCard {...ingredient} key={ingredient._id} />
        ))}
      </div>
    </div>
  );
});
