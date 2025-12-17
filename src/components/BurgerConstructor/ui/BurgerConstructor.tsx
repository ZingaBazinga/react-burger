import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { IIngredient, IConstructorIngredient } from "../../../entities/ingredient";
import { useRef, useMemo, useEffect } from "react";
import { Modal } from "../../Modal";
import { OrderDetails } from "../../OrderDetails";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useDrop } from "react-dnd";
import { addBurgerConstructor, replaceBurgerConstructor, clearBurgerConstructor } from "../../../services/burgerConstructorSlice";
import {
    decrementBurgerIngredients,
    incrementBurgerIngredients,
    resetBurgerIngredientsCounters,
} from "../../../services/burgerIngredientsSlice";
import { useModal } from "../../../hooks/useModal";
import { postOrder, resetOrderDetails } from "../../../services/orderDetailsSlice";
import { BurgerConstructorIngredients } from "../../BurgerConstructorIngredients";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function BurgerConstructor() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isModalOpen, openModal, closeModal } = useModal();
    const { isAuth } = useAuth();
    const dropRef = useRef<HTMLDivElement>(null);

    const { constructorItems } = useAppSelector((state) => state.burgerConstructor);
    const { burgerIngredients } = useAppSelector((state) => state.burgerIngredients);
    const { orderDetailsNumber, orderDetailsNumberRequest } = useAppSelector((state) => state.orderDetails);

    const bunIngredient = constructorItems.find((ingredient) => ingredient.type === "bun");
    const ingredients = constructorItems
        .map((ingredient, index) => ({ ingredient, index }))
        .filter(({ ingredient }) => ingredient.type !== "bun");

    const burgerConstructor = {
        bun: bunIngredient,
        ingredients: ingredients,
    };

    const totalPrice = useMemo(() => {
        let sum = 0;
        if (burgerConstructor.bun) {
            sum += burgerConstructor.bun.price * 2;
        }
        burgerConstructor.ingredients.forEach((ingredient) => {
            sum += ingredient.ingredient.price;
        });
        return sum;
    }, [burgerConstructor.bun, burgerConstructor.ingredients]);

    const [, drop] = useDrop({
        accept: "constructor",
        drop: (item: IIngredient) => {
            if (constructorItems.find((ingredient) => ingredient._id === item._id && item.type === "bun")) {
                return;
            } else if (
                constructorItems.find((ingredient) => ingredient._id !== item._id && item.type === "bun" && ingredient.type === "bun")
            ) {
                const oldBun = burgerIngredients.find((item) => item.__v !== 0 && item.type === "bun");
                dispatch(decrementBurgerIngredients(oldBun));
                dispatch(replaceBurgerConstructor(item));
                dispatch(incrementBurgerIngredients(item));
            } else {
                dispatch(addBurgerConstructor(item));
                dispatch(incrementBurgerIngredients(item));
            }
        },
    });

    const combinedRef = (node: HTMLDivElement | null) => {
        dropRef.current = node;
        drop(node);
    };

    const handleOrderClick = () => {
        if (isAuth) {
            const data = {
                ingredients: constructorItems.map((ingredient) => ingredient._id),
            };
            dispatch(postOrder(data));
            openModal();
        } else {
            navigate("/login");
        }
    };

    // Очищаем конструктор после успешного получения номера заказа
    useEffect(() => {
        if (orderDetailsNumber && !orderDetailsNumberRequest) {
            dispatch(clearBurgerConstructor());
            dispatch(resetBurgerIngredientsCounters());
        }
    }, [orderDetailsNumber, orderDetailsNumberRequest, dispatch]);

    const handleCloseModal = () => {
        if (orderDetailsNumber && !orderDetailsNumberRequest) {
            dispatch(resetOrderDetails());
            closeModal();
        }
    };

    return (
        <div ref={combinedRef} className={`${styles.container}`}>
            {!burgerConstructor.bun && burgerConstructor.ingredients.length === 0 && (
                <div className={styles.empty}>
                    <span className="text text_type_main-medium text_color_inactive">Пока пусто (перетащи ингредиент)</span>
                </div>
            )}
            <div className={`${styles.burger_constructor_item}`}>
                <div className={`${styles.burger_constructor_item_bun}`} />
                {burgerConstructor.bun && (
                    <ConstructorElement
                        type={"top"}
                        isLocked={true}
                        text={burgerConstructor.bun.name + " (верх)"}
                        price={burgerConstructor.bun.price}
                        thumbnail={burgerConstructor.bun.image_mobile}
                        key={burgerConstructor.bun._id}
                    />
                )}
            </div>
            <div className={`${styles.burger_constructor}`}>
                {burgerConstructor.ingredients.map((ingredient: { ingredient: IConstructorIngredient; index: number }) => (
                    <BurgerConstructorIngredients
                        key={ingredient.ingredient.uniqueId}
                        ingredient={ingredient}
                        constructorItems={constructorItems}
                    />
                ))}
            </div>
            <div className={`${styles.burger_constructor_item}`}>
                <div className={`${styles.burger_constructor_item_bun}`} />
                {burgerConstructor.bun && (
                    <ConstructorElement
                        type={"bottom"}
                        isLocked={true}
                        text={burgerConstructor.bun.name + " (низ)"}
                        price={burgerConstructor.bun.price}
                        thumbnail={burgerConstructor.bun.image_mobile}
                        key={burgerConstructor.bun._id}
                    />
                )}
            </div>
            <div className={`${styles.place_an_order}`}>
                <div className={`${styles.price}`}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    disabled={totalPrice === 0 || burgerConstructor.bun === undefined || burgerConstructor.ingredients.length === 0}
                    htmlType="button"
                    type="primary"
                    size="large"
                    extraClass={styles.button}
                    onClick={handleOrderClick}
                >
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <OrderDetails />
                </Modal>
            )}
        </div>
    );
}
