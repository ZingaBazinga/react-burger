import styles from "./profile.module.css";
import { Aside } from "../../components/Aside";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAuthUser, patchAuthUser } from "../../services/authSlice";
import { useForm } from "../../hooks/useForm";

export function Profile() {
    const dispatch = useAppDispatch();
    const profileData = useAppSelector((state) => state.auth.user);
    const { values, handleChange, setValues } = useForm({ email: profileData?.email || "", name: profileData?.name || "", password: "" });
    const hasRequested = useRef(false);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (!hasRequested.current) {
            hasRequested.current = true;
            dispatch(getAuthUser());
        }
    }, [dispatch, hasRequested]);

    useEffect(() => {
        setValues({ email: profileData?.email || "", name: profileData?.name || "", password: "" });
    }, [profileData, setValues]);

    useEffect(() => {
        setIsChanged(values.email !== profileData?.email || values.name !== profileData?.name);
    }, [values.email, values.name, profileData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(patchAuthUser({ data: { email: values.email, name: values.name, password: values.password } }))
            .unwrap()
            .then((data) => {
                setValues({ email: data.email, name: data.name, password: "" });
                setIsChanged(false);
            });
    };

    const handleCancel = () => {
        setValues({ email: profileData?.email || "", name: profileData?.name || "", password: "" });
        setIsChanged(false);
    };

    return (
        <div className={styles.profile}>
            <Aside />
            <form className={styles.profile_main} onSubmit={handleSubmit} onReset={handleCancel}>
                <Input
                    type="text"
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    placeholder="Имя"
                    icon="EditIcon"
                    onIconClick={() => {}}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                />
                <Input
                    type="text"
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    placeholder="Логин"
                    icon="EditIcon"
                    onIconClick={() => {}}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                />
                <Input
                    type="password"
                    onChange={handleChange}
                    value={values.password}
                    name="password"
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
