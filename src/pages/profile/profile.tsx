import styles from "./profile.module.css";
import { Aside } from "../../components/Aside";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

export function Profile() {
    // const profileData = useSelector((state: RootState) => state.auth.profileData);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={styles.profile}>
            <Aside />
            <div className={styles.profile_main}>
                <Input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name={"email"}
                    placeholder="Имя"
                    icon="EditIcon"
                    onIconClick={() => {}}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                />
                <Input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name={"name"}
                    placeholder="Логин"
                    icon="EditIcon"
                    onIconClick={() => {}}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                />
                <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name={"password"}
                    placeholder="Пароль"
                    icon="EditIcon"
                    onIconClick={() => {}}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                />
            </div>
        </div>
    );
}
