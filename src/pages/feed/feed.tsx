import { useCallback, useEffect, useMemo } from "react";
import { wsConnect, wsDisconnect } from "../../services/middleware/action-types";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { setOrder } from "../../services/orderSlice";
import { IOrder } from "../../entities/ordersWS";
import { WS_BASE_URL } from "../../utils/backend_api";

export function Feed() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { orders, error } = useAppSelector((state) => state.ordersWS);

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
        dispatch(wsConnect(`${WS_BASE_URL}/orders/all`));
        return () => {
            dispatch(wsDisconnect());
        };
    }, [dispatch]);

    // Разделение заказов на "Готовы" (done) и "В работе" (pending/created)
    const readyOrders = useMemo(() => {
        if (!orders) return [];
        return orders.orders.filter((order) => order.status === "done").map((order) => order.number);
    }, [orders]);

    const inWorkOrders = useMemo(() => {
        if (!orders) return [];
        return orders.orders.filter((order) => order.status === "pending" || order.status === "created").map((order) => order.number);
    }, [orders]);

    // Разбиение на колонки по 10 элементов
    const readyColumns = useMemo(() => {
        const columns: number[][] = [];
        for (let i = 0; i < readyOrders.length; i += 10) {
            columns.push(readyOrders.slice(i, i + 10));
        }
        return columns;
    }, [readyOrders]);

    const inWorkColumns = useMemo(() => {
        const columns: number[][] = [];
        for (let i = 0; i < inWorkOrders.length; i += 10) {
            columns.push(inWorkOrders.slice(i, i + 10));
        }
        return columns;
    }, [inWorkOrders]);

    const handleClick = (order: IOrder) => {
        dispatch(setOrder(order));
        navigate(`/feed/${order.number}`, {
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
        <div className={styles.feed}>
            <h1 className={"text text_type_main-large"}>Лента заказов</h1>
            <div className={styles.feed__content}>
                <ul className={styles.feed__orders}>
                    {orders.orders.map((order) => (
                        <li key={order._id} className={styles["feed-order"]} onClick={() => handleClick(order)}>
                            <div className={styles["feed-order__header"]}>
                                <span className="text text_type_digits-default">#{order.number}</span>
                                <span className="text text_type_main-default text_color_inactive">
                                    <FormattedDate date={new Date(order.createdAt)} />
                                </span>
                            </div>
                            <span className="text text_type_main-medium">{order.name}</span>
                            <div className={styles["feed-order__details"]}>
                                <div className={styles["feed-order__ingredients"]}>
                                    {order.ingredients.slice(0, 6).map((ingredientId, index) => (
                                        <div key={`${ingredientId}-${index}`} className={styles["feed-order__ingredient__image_border"]}>
                                            <img
                                                className={styles["feed-order__ingredient__image"]}
                                                src={burgerIngredients.find((ingredient) => ingredient._id === ingredientId)?.image_large}
                                                alt=""
                                            />
                                            {index === 5 && order.ingredients.length > 6 && (
                                                <div className={styles["feed-order__ingredient__more"]}>
                                                    <span className="text text_type_main-default">+{order.ingredients.length - 6}</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className={styles["feed-order__price"]}>
                                    <span className="text text_type_digits-default">{sumPrice(order.ingredients)}</span>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={styles["feed-results"]}>
                    <div className={styles["feed-results__statuses"]}>
                        <div className={styles["feed-results__statuses_column"]}>
                            <span className="text text_type_main-medium">Готовы:</span>
                            <div className={styles["feed-results__statuses_column-orders"]}>
                                {readyColumns.map((column, columnIndex) => (
                                    <div
                                        key={columnIndex}
                                        className={clsx(styles["feed-results__orders"], styles["feed-results__orders_ready"])}
                                    >
                                        {column.map((orderNumber) => (
                                            <p key={orderNumber} className="text text_type_digits-default">
                                                {String(orderNumber).padStart(6, "0")}
                                            </p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles["feed-results__statuses_column"]}>
                            <span className="text text_type_main-medium">В работе:</span>
                            <div className={styles["feed-results__statuses_column-orders"]}>
                                {inWorkColumns.map((column, columnIndex) => (
                                    <div key={columnIndex} className={styles["feed-results__orders"]}>
                                        {column.map((orderNumber) => (
                                            <p key={orderNumber} className="text text_type_digits-default">
                                                {String(orderNumber).padStart(6, "0")}
                                            </p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles["feed-results__total"]}>
                        <span className="text text_type_main-medium">Выполнено за все время:</span>
                        <span className={clsx("text text_type_digits-large", styles["feed-results__shadow"])}>{orders.total}</span>
                    </div>
                    <div className={styles["feed-results__total"]}>
                        <span className="text text_type_main-medium">Выполнено за сегодня:</span>
                        <span className={clsx("text text_type_digits-large", styles["feed-results__shadow"])}>{orders.totalToday}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
