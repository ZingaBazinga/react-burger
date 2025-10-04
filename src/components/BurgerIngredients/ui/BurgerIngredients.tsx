import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { EIngredientType } from "../../../entities/ingredient";
import { BurgerIngredientsContent } from "../../BurgerIngredientsContent";

export function BurgerIngredients() {
    return (
        <div className={`${styles.container}`}>
            <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
            <div className={`${styles.tab}`}>
                <Tab value="Булки" active={true} onClick={() => {}}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={false} onClick={() => {}}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={false} onClick={() => {}}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.ingredients}`}>
                <BurgerIngredientsContent type={EIngredientType.bun} />
                <BurgerIngredientsContent type={EIngredientType.sauce} />
                <BurgerIngredientsContent type={EIngredientType.main} />
            </div>
        </div>
    );
}
