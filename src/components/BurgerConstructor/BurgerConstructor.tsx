import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { data } from "../../utils/data";
import styles from './BurgerConstructor.module.css'
import { IIngredient } from "../../entities/ingredient";



class BurgerConstructor extends React.Component {
  render() {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.burger_constructor_item}`}>
                <div className={`${styles.burger_constructor_item_bun}`}/>
                <ConstructorElement
                    type={"top"}
                    isLocked={true}
                    text={data[0].name  + ' (верх)'}
                    price={data[0].price}
                    thumbnail={data[0].image_mobile}
                    key={data[0]._id}
                />
            </div>
            <div className={`${styles.burger_constructor}`}>
                {data.slice(1, -1).map((ingredient: IIngredient) => (
                    <div key={ingredient._id} className={`${styles.burger_constructor_item}`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            isLocked={false}
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image_mobile}
                            key={ingredient._id}
                        />
                    </div>
                ))}
            </div>
            <div className={`${styles.burger_constructor_item}`}>
                <div className={`${styles.burger_constructor_item_bun}`}/>
                <ConstructorElement
                    type={"bottom"}
                    isLocked={true}
                    text={data[0].name + ' (низ)'}
                    price={data[0].price}
                    thumbnail={data[0].image_mobile}
                    key={data[0]._id}
                />
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
