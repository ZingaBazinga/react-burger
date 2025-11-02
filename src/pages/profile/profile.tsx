import styles from "./profile.module.css";
import { Aside } from "../../components/Aside";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store";
import { getAuthUser } from "../../services/authSlice";

export function Profile() {
    const dispatch = useDispatch<AppDispatch>();
    const profileData = useSelector((state: RootState) => state.auth.user);
    const [email, setEmail] = useState(profileData?.email || "");
    const [name, setName] = useState(profileData?.name || "");
    const [password, setPassword] = useState("");
    const hasRequested = useRef(false);

    useEffect(() => {
        if (!hasRequested.current) {
            hasRequested.current = true;
            dispatch(getAuthUser());
        }
    }, [dispatch, hasRequested]);

    useEffect(() => {
        setEmail(profileData?.email || "");
        setName(profileData?.name || "");
    }, [profileData]);

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
