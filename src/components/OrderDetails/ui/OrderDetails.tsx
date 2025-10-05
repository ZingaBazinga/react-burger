import icon from "../../../assets/done.svg";
import styles from "./OrderDetails.module.css";

export function OrderDetails() {
    return (
        <div className={styles.container}>
            <span className={`text text_type_digits-large ${styles.number}`}>034536</span>
            <span className={`text text_type_main-medium`}>идентификатор заказа</span>
            <img className={styles.icon} src={icon} alt="" />
            <span className={`text text_type_main-default`}>Ваш заказ начали готовить</span>
            <span className={`text text_type_main-default text_color_inactive ${styles.await}`}>
                Дождитесь готовности на орбитальной станции
            </span>
        </div>
    );
}
