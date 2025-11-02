import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHeader } from "../../AppHeader";
import styles from "./App.module.css";
import { ForgotPassword, Ingredients, Login, Main, NotFound, Profile, Register, ResetPassword } from "../../../pages";

export function App() {
    return (
        <Router>
            <div className={styles.App}>
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/" element={<Main />} />
                        <Route path="/feed" element={<Main />} />
                        <Route path="/profile" element={<Main />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/ingredients/:id" element={<Ingredients />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
