import { useState } from "react";
import styles from "./reset-password.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

export function ResetPassword() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [code, setCode] = useState("");
    return (
        <div className={styles.container}>
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
                <Button htmlType="button" type="primary" size="medium">
                    Сохранить
                </Button>
                <p className={`text text_type_main-default text_color_inactive ${styles.description}`}>
                    Вспомнили пароль?{" "}
                    <Button htmlType="button" type="secondary" size="medium" extraClass={styles.link}>
                        Войти
                    </Button>
                </p>
            </div>
        </div>
    );
}
