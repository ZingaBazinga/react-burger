import { HTML5Backend } from "react-dnd-html5-backend";
import { AppHeader } from "../../AppHeader";
import { BurgerConstructor } from "../../BurgerConstructor";
import { BurgerIngredients } from "../../BurgerIngredients";
import styles from "./App.module.css";
import { DndProvider } from "react-dnd";

export function App() {
  return (
    <div className={styles.App}>
      <AppHeader />
      <main>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}
