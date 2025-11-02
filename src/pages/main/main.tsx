import { DndProvider } from "react-dnd";
import { BurgerIngredients } from "../../components/BurgerIngredients";
import { BurgerConstructor } from "../../components/BurgerConstructor";
import { HTML5Backend } from "react-dnd-html5-backend";

export function Main() {
    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
        </DndProvider>
    );
}
