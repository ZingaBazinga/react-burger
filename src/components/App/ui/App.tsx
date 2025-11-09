import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AppHeader } from "../../AppHeader";
import styles from "./App.module.css";
import { ForgotPassword, Ingredient, Login, Main, NotFound, Profile, ProfileOrders, Register, ResetPassword } from "../../../pages";
import { ProtectedRouteElement } from "../../../utils/ProtectedRoute";
import { useAppDispatch } from "../../../hooks/redux";
import { useEffect, useRef } from "react";
import { getBurgerIngredients } from "../../../services/burgerIngredientsSlice";

function AppRoutes() {
    const location = useLocation();
    const background = location.state?.background;

    return (
        <>
            <Routes location={background || location}>
                <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPassword />} forAuth={true} />} />
                <Route path="/" element={<Main />} />
                {!background && <Route path="/ingredients/:id" element={<Ingredient />} />}
                <Route path="/feed" element={<ProtectedRouteElement element={<>feed</>} forAuth={false} />} />
                <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} />} />
                <Route path="/profile/orders" element={<ProtectedRouteElement element={<ProfileOrders />} forAuth={true} />} />
                <Route path="/login" element={<ProtectedRouteElement element={<Login />} forAuth={true} />} />
                <Route path="/register" element={<ProtectedRouteElement element={<Register />} forAuth={true} />} />
                <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPassword />} forAuth={true} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={<Ingredient />} />
                </Routes>
            )}
        </>
    );
}

export function App() {
    const dispatch = useAppDispatch();
    const hasRequested = useRef(false);

    useEffect(() => {
        if (!hasRequested.current) {
            hasRequested.current = true;
            dispatch(getBurgerIngredients());
        }
    }, [dispatch]);
    return (
        <Router>
            <div className={styles.App}>
                <AppHeader />
                <main>
                    <AppRoutes />
                </main>
            </div>
        </Router>
    );
}
