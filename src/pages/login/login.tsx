import { useState } from "react";
import styles from "./login.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { postAuthLogin } from "../../services/authSlice";

export function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(postAuthLogin({ email, password })).unwrap();
            const from = (location.state as { from?: string })?.from || "/";
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Ошибка входа:", error);
        }
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Вход</h1>
            <Input
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="default"
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
            />
            <Input
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="default"
                icon={showPassword ? "ShowIcon" : "HideIcon"}
                onIconClick={() => setShowPassword(!showPassword)}
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
            />
            <div className={styles.buttons}>
                <Button htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
                <p className={`text text_type_main-default text_color_inactive ${styles.description}`}>
                    Вы — новый пользователь?{" "}
                    <Button htmlType="button" type="secondary" size="medium" extraClass={styles.link} onClick={() => navigate("/register")}>
                        Зарегистрироваться
                    </Button>
                </p>
                <p className={"text text_type_main-default text_color_inactive"}>
                    Забыли пароль?{" "}
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass={styles.link}
                        onClick={() => navigate("/forgot-password")}
                    >
                        Восстановить пароль
                    </Button>
                </p>
            </div>
        </form>
    );
}
