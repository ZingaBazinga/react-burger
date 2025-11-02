import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./AppHeader.module.css";
import { AppHeaderButton } from "../../AppHeaderButton";
import { ESelectedTab } from "../../../types/SelectedTab";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export function AppHeader() {
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuth } = useAuth();

    return (
        <header className={`${headerStyles.header}`}>
            <div className={headerStyles.header_content}>
                <div className={headerStyles.header_left}>
                    <AppHeaderButton type={ESelectedTab.constructor} isActive={location.pathname === "/"} onClick={() => navigate("/")} />
                    <AppHeaderButton
                        type={ESelectedTab.orderFeed}
                        isActive={location.pathname === "/feed"}
                        onClick={() => navigate("/feed")}
                    />
                </div>
                <Logo />
                <AppHeaderButton
                    type={ESelectedTab.personalAccount}
                    isActive={location.pathname === "/profile"}
                    onClick={() => {
                        if (isAuth) {
                            navigate("/profile");
                        } else {
                            navigate("/login");
                        }
                    }}
                />
            </div>
        </header>
    );
}
