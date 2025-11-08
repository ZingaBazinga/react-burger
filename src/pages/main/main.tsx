import { DndProvider } from "react-dnd";
import { BurgerIngredients } from "../../components/BurgerIngredients";
import { BurgerConstructor } from "../../components/BurgerConstructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../services/store";
import { getBurgerIngredients } from "../../services/burgerIngredientsSlice";
import { useRef, useEffect } from "react";

export function Main() {
    const dispatch = useDispatch<AppDispatch>();
    const hasRequested = useRef(false);

    useEffect(() => {
        if (!hasRequested.current) {
            hasRequested.current = true;
            dispatch(getBurgerIngredients());
        }
    }, [dispatch]);

    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
        </DndProvider>
    );
}
