import { IIngredient } from "../../../entities/ingredient";
import styles from "./OrderDetails.module.css";

export function OrderDetails(props: IIngredient) {
    return (
        <div className={styles.container}>
            <img src={props.image_large} alt="" />
            <span className={`text text_type_main-medium ${styles.container_name}`}>{props.name}</span>
            <div className={styles.container_bottom}>
                <div className={styles.container_bottom_item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Калории,ккал</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{props.calories}</span>
                </div>
                <div className={styles.container_bottom_item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Белки, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{props.proteins}</span>
                </div>
                <div className={styles.container_bottom_item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Жиры, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{props.fat}</span>
                </div>
                <div className={styles.container_bottom_item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Углеводы, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{props.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}
