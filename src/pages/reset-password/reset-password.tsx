import { useState, useEffect } from "react";
import styles from "./reset-password.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";
import { postPasswordResetReset } from "../../services/profileSlice";
import { useAppDispatch } from "../../hooks/redux";
import { useForm } from "../../hooks/useForm";

export function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const { values, handleChange } = useForm({ password: "", code: "" });
    const [showPassword, setShowPassword] = useState(false);

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
            await dispatch(postPasswordResetReset({ password: values.password, token: values.code })).unwrap();
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
                value={values.password}
                name="password"
                onChange={handleChange}
                size="default"
                icon={showPassword ? "ShowIcon" : "HideIcon"}
                onIconClick={() => setShowPassword(!showPassword)}
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
            />
            <Input
                type="text"
                placeholder="Введите код из письма"
                value={values.code}
                name="code"
                onChange={handleChange}
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
