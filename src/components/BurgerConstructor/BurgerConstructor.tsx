import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { data } from "../../utils/data";
import styles from './BurgerConstructor.module.css'

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

class BurgerConstructor extends React.Component {
  render() {
    return (
        <div className={`pl-2 pr-2 mb-15 mt-25 ${styles.container}`}>
            <div className={`${styles.burger_constructor}`}>
                {data.map((ingredient: IIngredient) => (
                    <div className={`${styles.burger_constructor_item}`}>
                        { ingredient._id === "60666c42cc7b410027a1a9b1" || ingredient._id === "60666c42cc7b410027a1a9b2" ? 
                            <div style={{width: '24px'}}/> : 
                            <DragIcon type="primary" />
                        }
                        <ConstructorElement
                            type={ingredient._id === "60666c42cc7b410027a1a9b1" ? "top": ingredient._id === "60666c42cc7b410027a1a9b2" ? 'bottom' : undefined}
                            isLocked={ingredient._id === "60666c42cc7b410027a1a9b1" ? true: ingredient._id === "60666c42cc7b410027a1a9b2" ? true : false}
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image_mobile}
                            key={ingredient._id}
                        />
                    </div>
                ))}
            </div>
            <div className={`${styles.place_an_order}`}>
                <div className={`${styles.price}`}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
  }
}

export default BurgerConstructor;
