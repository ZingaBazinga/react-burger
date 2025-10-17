import { useSelector } from "react-redux";
import styles from "./IngredientDetails.module.css";
import { RootState } from "../../../services/store";

export function IngredientDetails() {
    const { ingredientDetails } = useSelector((state: RootState) => state.ingredientDetails);

    if (!ingredientDetails) {
        return (
            <div className={styles.empty}>
                <span className="text text_type_main-medium text_color_inactive">Что-то пошло не так</span>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <img src={ingredientDetails.image_large} alt="" />
            <span className={`text text_type_main-medium ${styles.container_name}`}>{ingredientDetails.name}</span>
            <div className={styles.container_bottom}>
                <div className={styles.container_bottom_item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Калории,ккал</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{ingredientDetails.calories}</span>
                </div>
                <div className={styles.container_bottom_item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Белки, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{ingredientDetails.proteins}</span>
                </div>
                <div className={styles.container_bottom_item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Жиры, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{ingredientDetails.fat}</span>
                </div>
                <div className={styles.container_bottom_item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Углеводы, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{ingredientDetails.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}
