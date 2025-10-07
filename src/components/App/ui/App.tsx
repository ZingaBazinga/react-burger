import { useEffect } from "react";
import { AppHeader } from "../../AppHeader";
import { BurgerConstructor } from "../../BurgerConstructor";
import { BurgerIngredients } from "../../BurgerIngredients";
import { useGetIngredients } from "../../../hooks/useGetIngredients";
import styles from "./App.module.css";

export function App() {
    const { res, loading, fetch, error } = useGetIngredients();

    useEffect(() => {
        fetch();
    }, []);

    if (loading) {
        return <div>loading</div>;
    }

    if (res === undefined) {
        return <div>no data</div>;
    }

    if (error) {
        return <div>error</div>;
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
