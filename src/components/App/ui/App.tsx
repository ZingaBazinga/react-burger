import { AppHeader } from "../../AppHeader";
import { BurgerConstructor } from "../../BurgerConstructor";
import { BurgerIngredients } from "../../BurgerIngredients";
import styles from "./App.module.css";

export function App() {
    return (
        <div className={styles.App}>
            <AppHeader />
            <main>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </div>
    );
}
