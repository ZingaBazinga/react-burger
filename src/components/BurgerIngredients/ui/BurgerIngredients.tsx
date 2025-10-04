import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { EIngredientType, IIngredient } from "../../../entities/ingredient";
import { BurgerIngredientsContent } from "../../BurgerIngredientsContent";
import { separeteVariable } from "..";

interface Props {
    ingredients: IIngredient[];
}

export function BurgerIngredients(props: Props) {
    const { bun, main, sauce } = separeteVariable(props.ingredients);
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
                <BurgerIngredientsContent ingredient={bun} type={EIngredientType.bun} />
                <BurgerIngredientsContent ingredient={sauce} type={EIngredientType.sauce} />
                <BurgerIngredientsContent ingredient={main} type={EIngredientType.main} />
            </div>
        </div>
    );
}
