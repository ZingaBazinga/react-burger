import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientCard.module.css";
import { IIngredient } from "../../../entities/ingredient";
import { useDrag } from "react-dnd";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setIngredientDetails } from "../../../services/ingredientDetailsSlice";
import { useLocation, useNavigate } from "react-router-dom";

export function BurgerIngredientCard(props: IIngredient) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dragRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

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

    const handleClick = () => {
        dispatch(setIngredientDetails(props));
        navigate(`/ingredients/${props._id}`, {
            state: { background: location },
        });
    };

    return (
        <div ref={combinedRef} key={props._id} className={styles.card} onClick={handleClick}>
            <img className={styles.image} src={props.image} alt={props.name} />
            <div className={styles.price}>
                <span className="text text_type_digits-default">{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className="text text_type_main-default">{props.name}</span>
            {props.__v !== 0 && <Counter count={props.__v} size="default" extraClass="m-1" />}
        </div>
    );
}
