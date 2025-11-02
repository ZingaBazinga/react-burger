import styles from "./Aside.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../services/store";
import { postAuthLogout } from "../../../services/authSlice";

export function Aside() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    return (
        <aside className={styles.aside}>
            <div
                className={`${styles.link} text text_type_main-medium ${location.pathname === "/profile" ? "" : "text_color_inactive"}`}
                onClick={() => navigate("/profile")}
            >
                Профиль
            </div>
            <div
                className={`${styles.link} text text_type_main-medium ${location.pathname === "/profile/orders" ? "" : "text_color_inactive"}`}
                onClick={() => navigate("/profile/orders")}
            >
                История заказов
            </div>
            <div
                className={`${styles.link} text text_type_main-medium ${location.pathname === "/profile/logout" ? "" : "text_color_inactive"}`}
                onClick={async () => {
                    try {
                        await dispatch(postAuthLogout()).unwrap();
                        navigate("/");
                    } catch (error) {
                        console.error("Ошибка выхода:", error);
                    }
                }}
            >
                Выход
            </div>
            <span className="text text_type_main-default text_color_inactive mt-20">
                В этом разделе вы можете изменить свои персональные данные
            </span>
        </aside>
    );
}
