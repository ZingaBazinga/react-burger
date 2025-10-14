import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { EIngredientType } from "../../../entities/ingredient";
import { BurgerIngredientsContent } from "../../BurgerIngredientsContent";
import { separeteVariable } from "..";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../services/store";
import { useEffect, useRef } from "react";
import { getBurgerIngredients, switchBurgerIngredientsTab } from "../../../services/burgerIngredientsSlice";

export function BurgerIngredients() {
    const dispatch = useDispatch<AppDispatch>();
    const ingredientsContainerRef = useRef<HTMLDivElement>(null);
    const bunRef = useRef<HTMLDivElement>(null);
    const souceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const hasRequested = useRef(false);

    const { burgerIngredients, burgerIngredientsRequest, burgerIngredientsFailed, burgerIngredientsTab } = useSelector(
        (state: RootState) => state.burgerIngredients,
    );

    useEffect(() => {
        if (!hasRequested.current) {
            hasRequested.current = true;
            dispatch(getBurgerIngredients());
        }
    }, [dispatch]);

    const handleScroll = () => {
        if (
            ingredientsContainerRef &&
            ingredientsContainerRef.current &&
            bunRef &&
            bunRef.current &&
            souceRef &&
            souceRef.current &&
            mainRef &&
            mainRef.current
        ) {
            const bunHeight = bunRef.current?.offsetHeight;
            const sauceHeight = bunHeight + souceRef.current?.offsetHeight + 40;
            if (ingredientsContainerRef.current.scrollTop < bunHeight) {
                dispatch(switchBurgerIngredientsTab(EIngredientType.bun));
            } else if (
                ingredientsContainerRef.current.scrollTop >= bunHeight &&
                ingredientsContainerRef.current.scrollTop < sauceHeight
            ) {
                dispatch(switchBurgerIngredientsTab(EIngredientType.sauce));
            } else if (ingredientsContainerRef.current.scrollTop >= sauceHeight) {
                dispatch(switchBurgerIngredientsTab(EIngredientType.main));
            }
        }
    };

    useEffect(() => {
        ingredientsContainerRef.current?.addEventListener("scroll", handleScroll);
        return function () {
            ingredientsContainerRef.current?.removeEventListener("scroll", handleScroll);
        };
    }, [burgerIngredients]);

    if (burgerIngredientsRequest) {
        return <div>Загрузка...</div>;
    }

    if (burgerIngredientsFailed) {
        return <div>Ошибка загрузки данных</div>;
    }

    if (!burgerIngredients || burgerIngredients.length === 0) {
        return <div>Нет данных</div>;
    }

    const { bun, main, sauce } = separeteVariable(burgerIngredients);
    return (
        <div className={`${styles.container}`}>
            <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
            <div className={`${styles.tab}`}>
                <Tab
                    value="Булки"
                    active={burgerIngredientsTab === EIngredientType.bun}
                    onClick={() => {
                        dispatch(switchBurgerIngredientsTab(EIngredientType.bun));
                        ingredientsContainerRef.current?.scrollTo({top: 0, behavior: "smooth"})
                    }}
                >
                    Булки
                </Tab>
                <Tab
                    value="Соусы"
                    active={burgerIngredientsTab === EIngredientType.sauce}
                    onClick={() => {
                        dispatch(switchBurgerIngredientsTab(EIngredientType.sauce));
                        if (bunRef.current){
                            const bunHeight = bunRef.current?.offsetHeight ?? 0;
                            const targetY = bunHeight + 40;
                            ingredientsContainerRef.current?.scrollTo({top: targetY, behavior: "smooth"})}
                    }}
                >
                    Соусы
                </Tab>
                <Tab
                    value="Начинки"
                    active={burgerIngredientsTab === EIngredientType.main}
                    onClick={() => {
                        dispatch(switchBurgerIngredientsTab(EIngredientType.main));
                        if (bunRef.current && souceRef.current){
                            const bunHeight = bunRef.current?.offsetHeight ?? 0;
                            const sauceHeight = souceRef.current?.offsetHeight ?? 0;
                            const targetY = bunHeight + 40 + sauceHeight + 40;
                            ingredientsContainerRef.current?.scrollTo({top: targetY, behavior: "smooth"})}
                    }}
                >
                    Начинки
                </Tab>
            </div>
            <div ref={ingredientsContainerRef} className={`${styles.ingredients}`}>
                <BurgerIngredientsContent ref={bunRef} ingredient={bun} type={EIngredientType.bun} />
                <BurgerIngredientsContent ref={souceRef} ingredient={sauce} type={EIngredientType.sauce} />
                <BurgerIngredientsContent ref={mainRef} ingredient={main} type={EIngredientType.main} />
            </div>
        </div>
    );
}
