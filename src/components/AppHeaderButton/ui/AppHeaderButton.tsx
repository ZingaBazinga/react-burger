import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./AppHeaderButton.module.css";
import { AppHeaderButtonProps } from "../model/types";
import { ESelectedTab } from "../../../types/SelectedTab";
import { useNavigate } from "react-router-dom";

export function AppHeaderButton(props: AppHeaderButtonProps) {
    const navigate = useNavigate();
    function HeaderIcon() {
        switch (props.type) {
            case ESelectedTab.constructor: {
                return <BurgerIcon type={props.isActive ? "primary" : "secondary"} />;
            }
            case ESelectedTab.orderFeed: {
                return <ListIcon type={props.isActive ? "primary" : "secondary"} />;
            }
            case ESelectedTab.personalAccount: {
                return <ProfileIcon type={props.isActive ? "primary" : "secondary"} />;
            }
        }
    }
    function chooseText() {
        switch (props.type) {
            case ESelectedTab.constructor: {
                return "Конструктор";
            }
            case ESelectedTab.orderFeed: {
                return "Лента заказов";
            }
            case ESelectedTab.personalAccount: {
                return "Личный кабинет";
            }
        }
    }
    return (
        <nav
            className={`${headerStyles.header_button}`}
            onClick={() => {
                props.setIsActive(props.type);
                navigate(props.navigate);
            }}
        >
            <HeaderIcon />
            <span className={`text text_type_main-default ${!props.isActive && "text_color_inactive"}`}>{chooseText()}</span>
        </nav>
    );
}

export default AppHeaderButton;
