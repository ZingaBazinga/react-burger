import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientCard.module.css";
import { IIngredient } from "../../../entities/ingredient";
import { Modal } from "../../Modal";
import { IngredientDetails } from "../../IngredientDetails";
import { useModal } from "../../../hooks/useModal";
import { useDrag } from "react-dnd";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { resetIngredientDetails, setIngredientDetails } from "../../../services/ingredientDetailsSlice";

export function BurgerIngredientCard(props: IIngredient) {
    const dispatch = useDispatch();
    const dragRef = useRef<HTMLDivElement>(null);
    const { isModalOpen, openModal, closeModal } = useModal();

    const [, drag] = useDrag(() => ({
        type: "constructor",
        item: props,
        collect: (monitor) => ({
            isDrag: !!monitor.isDragging(),
        }),
    }));

    const combinedRef = (node: HTMLDivElement | null) => {
        dragRef.current = node;
        drag(node);
    };

    return (
        <div
            ref={combinedRef}
            key={props._id}
            className={styles.card}
            onClick={(e) => {
                dispatch(setIngredientDetails(props));
                openModal();
            }}
        >
            <img className={styles.image} src={props.image} alt={props.name} />
            <div className={styles.price}>
                <span className="text text_type_digits-default">{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className="text text_type_main-default">{props.name}</span>
            {props.__v !== 0 && <Counter count={props.__v} size="default" extraClass="m-1" />}
            {isModalOpen && (
                <Modal
                    onClose={() => {
                        dispatch(resetIngredientDetails());
                        closeModal();
                    }}
                    header="Детали ингредиента"
                >
                    <IngredientDetails />
                </Modal>
            )}
        </div>
    );
}
