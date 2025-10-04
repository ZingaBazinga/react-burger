import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientCard.module.css";
import { IIngredient } from "../../../entities/ingredient";

export function BurgerIngredientCard(props: IIngredient) {
    return (
        <div key={props._id} className={styles.card}>
            <img className={styles.image} src={props.image} alt={props.name} />
            <div className={styles.price}>
                <span className="text text_type_digits-default">{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className="text text_type_main-default">{props.name}</span>
            {props.__v !== 0 && <Counter count={props.__v} size="default" extraClass="m-1" />}
        </div>
    );
}
