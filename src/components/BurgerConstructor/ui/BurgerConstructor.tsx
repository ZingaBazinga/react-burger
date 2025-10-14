import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { IIngredient } from "../../../entities/ingredient";
import { useState } from "react";
import { Modal } from "../../Modal";
import { OrderDetails } from "../../OrderDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/store";

export function BurgerConstructor() {
    const [isModal, setIsModal] = useState<boolean>(false);

    const { burgerIngredients } = useSelector((state: RootState) => state.burgerIngredients);

    const bunIbgredient = burgerIngredients.find((ingredient) => ingredient.type === "bun");
    const ingredients = burgerIngredients.filter((ingredient) => ingredient.type !== "bun");

    const burgerConstructor = {
        bun: bunIbgredient,
        ingredients: ingredients,
    };

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.burger_constructor_item}`}>
                <div className={`${styles.burger_constructor_item_bun}`} />
                {burgerConstructor.bun && (
                    <ConstructorElement
                        type={"top"}
                        isLocked={true}
                        text={burgerConstructor.bun.name + " (верх)"}
                        price={burgerConstructor.bun.price}
                        thumbnail={burgerConstructor.bun.image_mobile}
                        key={burgerConstructor.bun._id}
                    />
                )}
            </div>
            <div className={`${styles.burger_constructor}`}>
                {burgerConstructor.ingredients.map((ingredient: IIngredient) => (
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
                {burgerConstructor.bun && (
                    <ConstructorElement
                        type={"bottom"}
                        isLocked={true}
                        text={burgerConstructor.bun.name + " (низ)"}
                        price={burgerConstructor.bun.price}
                        thumbnail={burgerConstructor.bun.image_mobile}
                        key={burgerConstructor.bun._id}
                    />
                )}
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
