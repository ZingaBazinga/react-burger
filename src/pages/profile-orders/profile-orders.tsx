import { Aside } from "../../components/Aside";
import styles from "./profile-orders.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useCallback, useEffect, useMemo } from "react";
import { wsConnect, wsDisconnect } from "../../services/middleware/action-types";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { setOrder } from "../../services/orderSlice";
import { IOrder } from "../../entities/ordersWS";
import { WS_BASE_URL } from "../../utils/backend_api";

export function ProfileOrders() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { orders, error } = useAppSelector((state) => state.ordersWS);

    const accessToken = localStorage.getItem("accessToken")?.replace("Bearer ", "") || "";

    const { burgerIngredients } = useAppSelector((state) => state.burgerIngredients);

    // внутри компонента Feed
    const ingredientPriceMap = useMemo(() => {
        const map = new Map<string, number>();
        burgerIngredients.forEach((ing) => map.set(ing._id, ing.price));
        return map;
    }, [burgerIngredients]);

    const sumPrice = useCallback(
        (ingredients: string[]): number => {
            return ingredients.reduce((sum, id) => sum + (ingredientPriceMap.get(id) ?? 0), 0);
        },
        [ingredientPriceMap],
    );

    useEffect(() => {
        dispatch(wsConnect(`${WS_BASE_URL}/orders?token=${accessToken}`));
        return () => {
            dispatch(wsDisconnect());
        };
    }, [dispatch, accessToken]);

    function status(status: string | undefined) {
        switch (status) {
            case "created":
                return "Создан";
            case "pending":
                return "Готовится";
            case "done":
                return "Выполнен";
            case "cancelled":
                return "Отменён";
            default:
                return status;
        }
    }

    const handleClick = (order: IOrder) => {
        dispatch(setOrder(order));
        navigate(`${order.number}`, {
            state: { background: location },
        });
    };

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (orders === null) {
        return <div>Загрузка заказов...</div>;
    }
    return (
        <div className={styles["profile-orders"]}>
            <Aside />

            <ul className={styles.orders}>
                {orders.orders.map((order) => (
                    <li key={order._id} className={styles["order"]} onClick={() => handleClick(order)}>
                        <div className={styles["order__header"]}>
                            <span className="text text_type_digits-default">#{order.number}</span>
                            <span className="text text_type_main-default text_color_inactive">
                                <FormattedDate date={new Date(order.createdAt)} />
                            </span>
                        </div>
                        <div className={styles["order__name"]}>
                            <span className="text text_type_main-medium">{order.name}</span>
                            <span className="text text_type_main-small">{status(order.status)}</span>
                        </div>
                        <div className={styles["order__details"]}>
                            <div className={styles["order__ingredients"]}>
                                {order.ingredients.slice(0, 6).map((ingredientId, index) => (
                                    <div key={`${ingredientId}-${index}`} className={styles["order__ingredient__image_border"]}>
                                        <img
                                            className={styles["order__ingredient__image"]}
                                            src={burgerIngredients.find((ingredient) => ingredient._id === ingredientId)?.image_large}
                                            alt=""
                                        />
                                        {index === 5 && order.ingredients.length > 6 && (
                                            <div className={styles["order__ingredient__more"]}>
                                                <span className="text text_type_main-default">+{order.ingredients.length - 6}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className={styles["order__price"]}>
                                <span className="text text_type_digits-default">{sumPrice(order.ingredients)}</span>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
