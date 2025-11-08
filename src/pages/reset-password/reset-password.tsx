import { useState, useEffect } from "react";
import styles from "./reset-password.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";
import { postPasswordResetReset } from "../../services/profileSlice";
import { useAppDispatch } from "../../hooks/redux";

export function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [code, setCode] = useState("");

    useEffect(() => {
        const fromForgotPassword = (location.state as { fromForgotPassword?: boolean })?.fromForgotPassword;
        const hasLocalStorageFlag = localStorage.getItem("passwordResetAllowed") === "true";

        if (!fromForgotPassword && !hasLocalStorageFlag) {
            navigate("/forgot-password", { replace: true });
        }
    }, [location.state, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(postPasswordResetReset({ password, token: code })).unwrap();
            localStorage.removeItem("passwordResetAllowed");
            navigate("/login");
        } catch (error) {
            console.error("Ошибка сброса пароля:", error);
        }
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <Input
                type={showPassword ? "text" : "password"}
                placeholder="Введите новый пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="default"
                icon={showPassword ? "ShowIcon" : "HideIcon"}
                onIconClick={() => setShowPassword(!showPassword)}
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
            />
            <Input
                type="text"
                placeholder="Введите код из письма"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                size="default"
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
            />
            <div className={styles.buttons}>
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
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
