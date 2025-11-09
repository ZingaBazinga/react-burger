import { IngredientDetails } from "../../components/IngredientDetails";
import styles from "./ingredients.module.css";
import { useLocation, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { resetIngredientDetails, setIngredientDetails } from "../../services/ingredientDetailsSlice";
import { useEffect } from "react";

export function Ingredient() {
    const location = useLocation();
    const background = location.state?.background;
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const { burgerIngredients } = useAppSelector((state) => state.burgerIngredients);
    const ingredient = burgerIngredients.find((ingredient) => ingredient._id === id);

    const handleClose = () => {
        dispatch(resetIngredientDetails());
        window.history.back();
    };

    useEffect(() => {
        if (ingredient) {
            dispatch(setIngredientDetails(ingredient));
        }
    }, [ingredient, dispatch]);

    if (background) {
        return (
            <Modal onClose={handleClose} header="Детали ингредиента">
                <IngredientDetails />
            </Modal>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-large">Детали ингредиента</h1>
            <IngredientDetails />
        </div>
    );
}
