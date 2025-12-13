import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { EIngredientType } from "../../../entities/ingredient";
import { BurgerIngredientsContent } from "../../BurgerIngredientsContent";
import { separateVariable } from "..";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useEffect, useRef, useState } from "react";
import { switchBurgerIngredientsTab } from "../../../services/burgerIngredientsSlice";
import { useInView } from "react-intersection-observer";

export function BurgerIngredients() {
    const dispatch = useAppDispatch();
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const ingredientsContainerRef = useRef<HTMLDivElement>(null);
    const bunRef = useRef<HTMLDivElement>(null);
    const souceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const { burgerIngredients, burgerIngredientsRequest, burgerIngredientsFailed, burgerIngredientsTab } = useAppSelector(
        (state) => state.burgerIngredients,
    );

    const setIngredientsContainerRef = (node: HTMLDivElement | null) => {
        ingredientsContainerRef.current = node;
        setRootElement(node);
    };

    const { ref: bunInViewRef, inView: bunInView } = useInView({
        root: rootElement,
        rootMargin: "-1px 0px -80% 0px",
        threshold: 0,
    });

    const { ref: sauceInViewRef, inView: sauceInView } = useInView({
        root: rootElement,
        rootMargin: "-1px 0px -80% 0px",
        threshold: 0,
    });

    const { ref: mainInViewRef, inView: mainInView } = useInView({
        root: rootElement,
        rootMargin: "-1px 0px -80% 0px",
        threshold: 0,
    });

    const setBunRef = (node: HTMLDivElement | null) => {
        bunRef.current = node;
        bunInViewRef(node);
    };

    const setSauceRef = (node: HTMLDivElement | null) => {
        souceRef.current = node;
        sauceInViewRef(node);
    };

    const setMainRef = (node: HTMLDivElement | null) => {
        mainRef.current = node;
        mainInViewRef(node);
    };

    useEffect(() => {
        if (bunInView) {
            dispatch(switchBurgerIngredientsTab(EIngredientType.bun));
        } else if (sauceInView) {
            dispatch(switchBurgerIngredientsTab(EIngredientType.sauce));
        } else if (mainInView) {
            dispatch(switchBurgerIngredientsTab(EIngredientType.main));
        }
    }, [bunInView, sauceInView, mainInView, dispatch]);

    if (burgerIngredientsRequest) {
        return (
            <div className={`${styles.container}`}>
                <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
                <div className={styles.empty}>
                    <span className="text text_type_main-medium text_color_inactive">Загрузка...</span>
                </div>
            </div>
        );
    }

    if (burgerIngredientsFailed) {
        return (
            <div className={`${styles.container}`}>
                <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
                <div className={styles.empty}>
                    <span className="text text_type_main-medium text_color_inactive">Ошибка загрузки данных</span>
                </div>
            </div>
        );
    }

    if (!burgerIngredients || burgerIngredients.length === 0) {
        return (
            <div className={`${styles.container}`}>
                <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
                <div className={styles.empty}>
                    <span className="text text_type_main-medium text_color_inactive">Нет данных</span>
                </div>
            </div>
        );
    }

    const { bun, main, sauce } = separateVariable(burgerIngredients);

    return (
        <div className={`${styles.container}`}>
            <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
            <div className={`${styles.tab}`}>
                <Tab
                    value="Булки"
                    active={burgerIngredientsTab === EIngredientType.bun}
                    onClick={() => {
                        dispatch(switchBurgerIngredientsTab(EIngredientType.bun));
                        ingredientsContainerRef.current?.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }}
                >
                    Булки
                </Tab>
                <Tab
                    value="Соусы"
                    active={burgerIngredientsTab === EIngredientType.sauce}
                    onClick={() => {
                        dispatch(switchBurgerIngredientsTab(EIngredientType.sauce));
                        if (bunRef.current) {
                            const bunHeight = bunRef.current?.offsetHeight ?? 0;
                            const targetY = bunHeight + 40;
                            ingredientsContainerRef.current?.scrollTo({
                                top: targetY,
                                behavior: "smooth",
                            });
                        }
                    }}
                >
                    Соусы
                </Tab>
                <Tab
                    value="Начинки"
                    active={burgerIngredientsTab === EIngredientType.main}
                    onClick={() => {
                        dispatch(switchBurgerIngredientsTab(EIngredientType.main));
                        if (bunRef.current && souceRef.current) {
                            const bunHeight = bunRef.current?.offsetHeight ?? 0;
                            const sauceHeight = souceRef.current?.offsetHeight ?? 0;
                            const targetY = bunHeight + 40 + sauceHeight + 40;
                            ingredientsContainerRef.current?.scrollTo({
                                top: targetY,
                                behavior: "smooth",
                            });
                        }
                    }}
                >
                    Начинки
                </Tab>
            </div>
            <div ref={setIngredientsContainerRef} className={`${styles.ingredients}`}>
                <BurgerIngredientsContent ref={setBunRef} ingredient={bun} type={EIngredientType.bun} />
                <BurgerIngredientsContent ref={setSauceRef} ingredient={sauce} type={EIngredientType.sauce} />
                <BurgerIngredientsContent ref={setMainRef} ingredient={main} type={EIngredientType.main} />
            </div>
        </div>
    );
}
