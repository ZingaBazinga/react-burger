import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useCallback, useEffect, useMemo } from "react";
import { wsConnect, wsDisconnect } from "../../services/middleware/action-types";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed.module.css";
import { useAppSelector } from "../../hooks/redux";
import clsx from "clsx";

export function Feed() {
    const dispatch = useDispatch();
    const { orders, isConnected, error } = useSelector((state: RootState) => state.ordersWS);

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
        if (!isConnected) {
            dispatch(wsConnect("wss://norma.education-services.ru/orders/all"));
        }
        return () => {
            dispatch(wsDisconnect());
        };
    }, [dispatch]);

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
                        <li key={order._id} className={styles["feed-order"]}>
                            <div className={styles["feed-order__header"]}>
                                <span className="text text_type_digits-default">#{order.number}</span>
                                <span className="text text_type_main-default text_color_inactive">
                                    <FormattedDate date={new Date(order.createdAt)} />
                                </span>
                            </div>
                            <span className="text text_type_main-medium">{order.name}</span>
                            <div className={styles["feed-order__details"]}>
                                <div className={styles["feed-order__ingredients"]}>
                                    {order.ingredients.slice(0, 6).map((ingredientId) => (
                                        <div key={ingredientId} className={styles["feed-order__ingredient__image_border"]}>
                                            <img
                                                className={styles["feed-order__ingredient__image"]}
                                                src={burgerIngredients.find((ingredient) => ingredient._id === ingredientId)?.image_large}
                                                alt=""
                                            />
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
                <div className={styles['feed-results']}>
                    <div className={styles['feed-results__statuses']}>
                        <div className={styles['feed-results__statuses_column']}>
                            <span className="text text_type_main-medium">Готовы:</span>
                            <div className={clsx(styles["feed-results__orders"], styles["feed-results__orders_ready"])}>
                                <p className="text text_type_digits-default">034533</p>
                                <p className="text text_type_digits-default">034532</p>
                                <p className="text text_type_digits-default">034530</p>
                                <p className="text text_type_digits-default">034527</p>
                                <p className="text text_type_digits-default">034525</p>
                            </div>
                        </div>
                        <div className={styles['feed-results__statuses_column']}>
                            <span className="text text_type_main-medium">В работе:</span>
                            <div className={styles["feed-results__orders"]}>
                                <p className="text text_type_digits-default">034538</p>
                                <p className="text text_type_digits-default">034541</p>
                                <p className="text text_type_digits-default">034542</p>
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
