import { useState } from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./AppHeader.module.css";
import { AppHeaderButton } from "../../AppHeaderButton";
import { ESelectedTab } from "../../../types/SelectedTab";

export function AppHeader() {
    const [select, setSelect] = useState<ESelectedTab>(ESelectedTab.constructor);

    return (
        <header className={`${headerStyles.header}`}>
            <div className={headerStyles.header_content}>
                <div className={headerStyles.header_left}>
                    <AppHeaderButton
                        type={ESelectedTab.constructor}
                        isActive={select === ESelectedTab.constructor}
                        setIsActive={setSelect}
                    />
                    <AppHeaderButton type={ESelectedTab.orderFeed} isActive={select === ESelectedTab.orderFeed} setIsActive={setSelect} />
                </div>
                <Logo />
                <AppHeaderButton
                    type={ESelectedTab.personalAccount}
                    isActive={select === ESelectedTab.personalAccount}
                    setIsActive={setSelect}
                />
            </div>
        </header>
    );
}
