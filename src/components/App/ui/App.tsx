import { useEffect } from "react";
import { AppHeader } from "../../AppHeader";
import { BurgerConstructor } from "../../BurgerConstructor";
import { BurgerIngredients } from "../../BurgerIngredients";
import { GetIngredients } from "../api/api";
import styles from "./App.module.css";

export function App() {
    const { res, loading, fetch } = GetIngredients();

    useEffect(() => {
        fetch();
    });

    if (loading) {
        return <div>loading</div>;
    }

    if (res === undefined) {
        return <div>no data</div>;
    }
    return (
        <div className={styles.App}>
            <AppHeader />
            <main>
                <BurgerIngredients ingredients={res} />
                <BurgerConstructor ingredients={res} />
            </main>
        </div>
    );
}
