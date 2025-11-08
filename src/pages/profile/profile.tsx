import styles from "./profile.module.css";
import { Aside } from "../../components/Aside";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store";
import { getAuthUser, patchAuthUser } from "../../services/authSlice";

export function Profile() {
    const dispatch = useDispatch<AppDispatch>();
    const profileData = useSelector((state: RootState) => state.auth.user);
    const [email, setEmail] = useState(profileData?.email || "");
    const [name, setName] = useState(profileData?.name || "");
    const [password, setPassword] = useState("");
    const hasRequested = useRef(false);
    const [isChanged, setIsChanged] = useState(false);

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

    useEffect(() => {
        setIsChanged(email !== profileData?.email || name !== profileData?.name);
    }, [email, name, profileData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(patchAuthUser({ data: { email, name, password } }))
            .unwrap()
            .then((data) => {
                setEmail(data.email);
                setName(data.name);
                setIsChanged(false);
            });
    };

    const handleCancel = () => {
        setEmail(profileData?.email || "");
        setName(profileData?.name || "");
        setPassword("");
        setIsChanged(false);
    };

    return (
        <div className={styles.profile}>
            <Aside />
            <form className={styles.profile_main} onSubmit={handleSubmit} onReset={handleCancel}>
                <Input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name={"name"}
                    placeholder="Имя"
                    icon="EditIcon"
                    onIconClick={() => {}}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                />
                <Input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name={"email"}
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
                {isChanged && (
                    <div className={styles.buttons}>
                        <Button htmlType="reset" type="secondary" size="medium">
                            Отменить
                        </Button>
                        <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
}
