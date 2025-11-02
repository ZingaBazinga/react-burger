import { useEffect, useState } from "react";
import styles from "./reset-password.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { postPasswordResetReset } from "../../services/profileSlice";
import { AppDispatch, RootState } from "../../services/store";
import { useDispatch, useSelector } from "react-redux";

export function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const passwordResetResetSuccess = useSelector((state: RootState) => state.profile.passwordResetResetSuccess);

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [code, setCode] = useState("");

    const handleSubmit = () => {
        dispatch(postPasswordResetReset({ password, token: code }));
    };

    useEffect(() => {
        if (passwordResetResetSuccess) {
            navigate("/login");
        }
    }, [passwordResetResetSuccess, navigate]);
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
                <Button htmlType="button" type="primary" size="medium" onClick={() => handleSubmit()}>
                    Сохранить
                </Button>
                <p className={`text text_type_main-default text_color_inactive ${styles.description}`}>
                    Вспомнили пароль?{" "}
                    <Button htmlType="button" type="secondary" size="medium" extraClass={styles.link} onClick={() => navigate("/login")}>
                        Войти
                    </Button>
                </p>
            </div>
        </div>
    );
}
