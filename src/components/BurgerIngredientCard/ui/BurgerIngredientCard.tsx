import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientCard.module.css";
import { IIngredient } from "../../../entities/ingredient";
import { useState } from "react";
import { Modal } from "../../Modal";
import { IngredientDetails } from "../../IngredientDetails";

export function BurgerIngredientCard(props: IIngredient) {
    const [isModal, setIsModal] = useState<boolean>(false);

    return (
        <div
            key={props._id}
            className={styles.card}
            onClick={(e) => {
                setIsModal(true);
            }}
        >
            <img className={styles.image} src={props.image} alt={props.name} />
            <div className={styles.price}>
                <span className="text text_type_digits-default">{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className="text text_type_main-default">{props.name}</span>
            {props.__v !== 0 && <Counter count={props.__v} size="default" extraClass="m-1" />}
            {isModal && (
                <Modal
                    onClose={() => {
                        setIsModal(false);
                    }}
                    header="Детали ингредиента"
                >
                    <IngredientDetails {...props} />
                </Modal>
            )}
        </div>
    );
}
