import { useSelector } from "react-redux";
import icon from "../../../assets/done.svg";
import styles from "./OrderDetails.module.css";
import { RootState } from "../../../services/store";

export function OrderDetails() {
    const { orderDetailsNumber, orderDetailsNumberRequest, orderDetailsNumberFailed } = useSelector(
        (state: RootState) => state.orderDetails,
    );

    if (orderDetailsNumberRequest) {
        return <div>Загрузка...</div>;
    }

    if (orderDetailsNumberFailed) {
        return <div>Ошибка</div>;
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
