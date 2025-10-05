import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { IIngredient } from "../../../entities/ingredient";
import { useState } from "react";
import { Modal } from "../../Modal";
import { OrderDetails } from "../../OrderDetails";

interface Props {
    ingredients: IIngredient[];
}

export function BurgerConstructor(props: Props) {
    const [isModal, setIsModal] = useState<boolean>(false);

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.burger_constructor_item}`}>
                <div className={`${styles.burger_constructor_item_bun}`} />
                <ConstructorElement
                    type={"top"}
                    isLocked={true}
                    text={props.ingredients[0].name + " (верх)"}
                    price={props.ingredients[0].price}
                    thumbnail={props.ingredients[0].image_mobile}
                    key={props.ingredients[0]._id}
                />
            </div>
            <div className={`${styles.burger_constructor}`}>
                {props.ingredients.slice(1, -1).map((ingredient: IIngredient) => (
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
                <div className={`${styles.burger_constructor_item_bun}`} />
                <ConstructorElement
                    type={"bottom"}
                    isLocked={true}
                    text={props.ingredients[0].name + " (низ)"}
                    price={props.ingredients[0].price}
                    thumbnail={props.ingredients[0].image_mobile}
                    key={props.ingredients[0]._id}
                />
            </div>
            <div className={`${styles.place_an_order}`}>
                <div className={`${styles.price}`}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" extraClass={styles.button} onClick={() => setIsModal(true)}>
                    Оформить заказ
                </Button>
            </div>
            {isModal && (
                <Modal
                    onClose={() => {
                        setIsModal(false);
                    }}
                >
                    <OrderDetails />
                </Modal>
            )}
        </div>
    );
}
