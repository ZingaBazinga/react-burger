import { useState } from "react";
import styles from "./login.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className={styles.container}>
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
                <Button htmlType="button" type="primary" size="medium">
                    Войти
                </Button>
                <p className={`text text_type_main-default text_color_inactive ${styles.description}`}>
                    Вы — новый пользователь?{" "}
                    <Button htmlType="button" type="secondary" size="medium" extraClass={styles.link}>
                        Зарегистрироваться
                    </Button>
                </p>
                <p className={"text text_type_main-default text_color_inactive"}>
                    Забыли пароль?{" "}
                    <Button htmlType="button" type="secondary" size="medium" extraClass={styles.link}>
                        Восстановить пароль
                    </Button>
                </p>
            </div>
        </div>
    );
}
