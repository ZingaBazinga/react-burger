import styles from "./OrderContent.module.css";
import { useAppSelector } from "../../../hooks/redux";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { useCallback, useMemo } from "react";

export const OrderContent = () => {
    const { orderItems } = useAppSelector((state) => state.order);
    const { burgerIngredients } = useAppSelector((state) => state.burgerIngredients);

    const ingredientMap = useMemo(() => {
        const map = new Map<string, (typeof burgerIngredients)[number]>();
        burgerIngredients.forEach((ing) => map.set(ing._id, ing));
        return map;
    }, [burgerIngredients]);

    // Тогда sumPrice:
    const sumPrice = useCallback(
        (ingredients: string[]): number => {
            return ingredients.reduce((sum, id) => {
                const ing = ingredientMap.get(id);
                return sum + (ing?.price ?? 0);
            }, 0);
        },
        [ingredientMap],
    );

    function countStrings(ingredients: string[]): { ingredient: string; count: number }[] {
        const counts = new Map<string, number>();
        for (const item of ingredients) {
            counts.set(item, (counts.get(item) || 0) + 1);
        }
        return Array.from(counts.entries()).map(([ingredient, count]) => ({ ingredient, count }));
    }

    function getIngredientById(ingredients: { ingredient: string; count: number }[]) {
        const orderIngredients: { img: string; name: string; price: number; count: number }[] = [];
        for (const element of ingredients) {
            const ing = ingredientMap.get(element.ingredient);
            if (ing) {
                orderIngredients.push({ img: ing.image, name: ing.name, price: ing.price, count: element.count });
            }
        }
        return orderIngredients;
    }

    const orderIngredients = getIngredientById(countStrings(orderItems?.ingredients || []));

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

    return (
        <div className={styles.order}>
            <div className={styles.order__name}>
                <span className="text text_type_main-medium">{orderItems?.name}</span>
                <span className={clsx("text text_type_main-small", styles.order__name_status)}>{status(orderItems?.status)}</span>
            </div>
            <div className={styles["order-ingredients"]}>
                <span className="text text_type_main-medium">Состав:</span>
                <ul className={styles["order-ingredients__list"]}>
                    {orderIngredients?.map((orderIngredient, index) => (
                        <li key={index} className={styles["order-ingredient"]}>
                            <div className={styles["order-ingredient__description"]}>
                                <div className={styles["order-ingredient__description_image-border"]}>
                                    <img className={styles["order-ingredient__description_image"]} src={orderIngredient.img} alt="" />
                                </div>
                                <span className="text text_type_main-default">{orderIngredient.name}</span>
                            </div>
                            <div className={styles["order-ingredient__price"]}>
                                <span className="text text_type_digits-default">{`${orderIngredient.count} x ${orderIngredient.price}`}</span>
                                <CurrencyIcon type="primary" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.order__footer}>
                <span className="text text_type_main-default text_color_inactive">
                    {orderItems && <FormattedDate date={new Date(orderItems.updatedAt)} />}
                </span>
                <span className={clsx("text text_type_digits-default", styles.order__footer_price)}>
                    {orderItems && sumPrice(orderItems.ingredients)} <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    );
};
