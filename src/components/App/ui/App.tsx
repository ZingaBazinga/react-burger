import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHeader } from "../../AppHeader";
import styles from "./App.module.css";
import { ForgotPassword, Ingredient, Login, Main, NotFound, Profile, ProfileOrders, Register, ResetPassword } from "../../../pages";
import { ProtectedRouteElement } from "../../../utils/ProtectedRoute";

export function App() {
    return (
        <Router>
            <div className={styles.App}>
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPassword />} forAuth={true} />} />
                        <Route path="/" element={<Main />} />
                        <Route path="/ingredients/:id" element={<Ingredient />} />
                        <Route path="/feed" element={<ProtectedRouteElement element={<>feed</>} forAuth={false} />} />
                        <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} />} />
                        <Route path="/profile/orders" element={<ProtectedRouteElement element={<ProfileOrders />} forAuth={true} />} />
                        <Route path="/login" element={<ProtectedRouteElement element={<Login />} forAuth={true} />} />
                        <Route path="/register" element={<ProtectedRouteElement element={<Register />} forAuth={true} />} />
                        <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPassword />} forAuth={true} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
