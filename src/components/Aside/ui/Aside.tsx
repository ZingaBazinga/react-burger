import styles from "./Aside.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Aside() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLinkClick = (link: string) => {
        navigate(link);
    };
    return (
        <aside className={styles.aside}>
            <Link
                to="/profile"
                className={`text text_type_main-medium ${location.pathname === "/profile" ? "" : "text_color_inactive"}`}
                onClick={() => handleLinkClick("/profile")}
            >
                Профиль
            </Link>
            <Link
                to="/profile/orders"
                className={`text text_type_main-medium ${location.pathname === "/profile/orders" ? "" : "text_color_inactive"}`}
                onClick={() => handleLinkClick("/profile/orders")}
            >
                История заказов
            </Link>
            <Link
                to="/profile/logout"
                className={`text text_type_main-medium ${location.pathname === "/profile/logout" ? "" : "text_color_inactive"}`}
                onClick={() => handleLinkClick("/profile/logout")}
            >
                Выход
            </Link>
            <span className="text text_type_main-default text_color_inactive mt-20">
                В этом разделе вы можете изменить свои персональные данные
            </span>
        </aside>
    );
}
