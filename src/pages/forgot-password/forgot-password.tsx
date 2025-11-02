import { useEffect, useState } from "react";
import styles from "./forgot-password.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPasswordReset } from "../../services/profileSlice";
import { AppDispatch, RootState } from "../../services/store";

export function ForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const passwordResetSuccess = useSelector((state: RootState) => state.profile.passwordResetSuccess);

    const [email, setEmail] = useState("");
    const handleSubmit = () => {
        dispatch(postPasswordReset(email));
    };

    useEffect(() => {
        if (passwordResetSuccess) {
            navigate("/reset-password");
        }
    }, [passwordResetSuccess, navigate]);

    return (
        <div className={styles.container}>
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
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    Восстановить
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
