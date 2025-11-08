import { DndProvider } from "react-dnd";
import { BurgerIngredients } from "../../components/BurgerIngredients";
import { BurgerConstructor } from "../../components/BurgerConstructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch } from "../../hooks/redux";
import { getBurgerIngredients } from "../../services/burgerIngredientsSlice";
import { useRef, useEffect } from "react";

export function Main() {
    const dispatch = useAppDispatch();
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
