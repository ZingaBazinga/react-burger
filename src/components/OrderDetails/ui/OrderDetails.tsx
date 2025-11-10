import { useAppSelector } from "../../../hooks/redux";
import icon from "../../../assets/done.svg";
import styles from "./OrderDetails.module.css";

export function OrderDetails() {
    const { orderDetailsNumber, orderDetailsNumberRequest, orderDetailsNumberFailed } = useAppSelector((state) => state.orderDetails);

    if (orderDetailsNumberRequest) {
        return (
            <div className={styles.empty}>
                <span className="text text_type_main-medium text_color_inactive">Загрузка...</span>
            </div>
        );
    }

    if (orderDetailsNumberFailed) {
        return (
            <div className={styles.empty}>
                <span className="text text_type_main-medium text_color_inactive">Ошибка</span>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <span className={`text text_type_digits-large ${styles.number}`}>{orderDetailsNumber}</span>
            <span className={`text text_type_main-medium`}>идентификатор заказа</span>
            <img className={styles.icon} src={icon} alt="" />
            <span className={`text text_type_main-default`}>Ваш заказ начали готовить</span>
            <span className={`text text_type_main-default text_color_inactive ${styles.await}`}>
                Дождитесь готовности на орбитальной станции
            </span>
        </div>
    );
}
