import { useState } from "react";
import styles from "./forgot-password.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postPasswordReset } from "../../services/profileSlice";
import { AppDispatch } from "../../services/store";

export function ForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [email, setEmail] = useState("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(postPasswordReset(email)).unwrap();
            localStorage.setItem("passwordResetAllowed", "true");
            navigate("/reset-password", { state: { fromForgotPassword: true } });
        } catch (error) {
            console.error("Ошибка восстановления пароля:", error);
        }
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <Input
                type="email"
                placeholder="Укажите e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="default"
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
            />
            <div className={styles.buttons}>
                <Button htmlType="submit" type="primary" size="medium">
                    Восстановить
                </Button>
                <p className={`text text_type_main-default text_color_inactive ${styles.description}`}>
                    Вспомнили пароль?{" "}
                    <Button htmlType="button" type="secondary" size="medium" extraClass={styles.link} onClick={() => navigate("/login")}>
                        Войти
                    </Button>
                </p>
            </div>
        </form>
    );
}
