import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHeader } from "../../AppHeader";
import styles from "./App.module.css";
import { ForgotPassword, Ingredients, Login, Main, NotFound, Profile, Register, ResetPassword } from "../../../pages";

export function App() {
    return (
        <div className={styles.App}>
            <AppHeader />
            <main>
                <Router>
                    <Routes>
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/" element={<Main />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/ingredients/:id" element={<Ingredients />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </main>
        </div>
    );
}
