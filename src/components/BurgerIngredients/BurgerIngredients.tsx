import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { data } from "../../utils/data";
import BurgerIngredientCard from "./BurgerIngredientCard";
import styles from './BurgerIngredients.module.css'

export interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

class BurgerIngredients extends React.Component {
  render() {
    return (
        <div className={`pt-10 ${styles.container}`}>
            <h1 className={`text text_type_main-large pb-5`}>Соберите бургер</h1>
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
            <div className={`mt-10 mb-10 ${styles.ingredients}`}>
                <div className={`${styles.ingredients_container}`}>
                    <h2 className={`text text_type_main-medium`}>Булки</h2>
                    <div className={styles.cards}>
                        {data.filter((ingredient: IIngredient) => ingredient.type === 'bun')
                        .map((ingredient: IIngredient) => (
                            <BurgerIngredientCard {...ingredient} key={ingredient._id}/>
                        ))}
                    </div>
                </div>
                <div className={`${styles.ingredients_container}`}>
                    <h2 className={`text text_type_main-medium`}>Соусы</h2>
                    <div className={styles.cards}>
                        {data.filter((ingredient: IIngredient) => ingredient.type === 'sauce')
                        .map((ingredient: IIngredient) => (
                            <BurgerIngredientCard {...ingredient} key={ingredient._id}/>
                        ))}
                    </div>
                </div>
                <div className={`${styles.ingredients_container}`}>
                    <h2 className={`text text_type_main-medium`}>МЯСО</h2>
                    <div className={styles.cards}>
                        {data.filter((ingredient: IIngredient) => ingredient.type === 'main')
                        .map((ingredient: IIngredient) => (
                            <BurgerIngredientCard {...ingredient} key={ingredient._id}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default BurgerIngredients;
