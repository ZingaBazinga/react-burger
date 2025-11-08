import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { postAuthRegister } from "../../services/authSlice";

export function Register() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(postAuthRegister({ name, email, password })).unwrap();
            navigate("/");
        } catch (error) {
            console.error("Ошибка регистрации:", error);
        }
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Регистрация</h1>
            <Input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="default"
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
            />
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
                    Зарегистрироваться
                </Button>
                <p className={`text text_type_main-default text_color_inactive ${styles.description}`}>
                    Уже зарегистрированы?{" "}
                    <Button htmlType="button" type="secondary" size="medium" extraClass={styles.link} onClick={() => navigate("/login")}>
                        Войти
                    </Button>
                </p>
            </div>
        </form>
    );
}
