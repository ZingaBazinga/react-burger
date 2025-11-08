import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuthUser } from "../services/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../services/store";

export function ProtectedRouteElement({ element, forAuth }: { element: React.ReactElement; forAuth?: boolean }): React.ReactElement | null {
    let { isAuth } = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    // Получаем состояние пользователя из store
    const user = useSelector((state: RootState) => state.auth.user);
    const userRequest = useSelector((state: RootState) => state.auth.userRequest);
    const userSuccess = useSelector((state: RootState) => state.auth.userSuccess);
    const userFailed = useSelector((state: RootState) => state.auth.userFailed);

    // Отслеживаем завершение запроса пользователя
    useEffect(() => {
        if (user || userSuccess || userFailed) {
            setUserLoaded(true);
        }
    }, [user, userSuccess, userFailed]);

    useEffect(() => {
        const init = async () => {
            if (forAuth && !localStorage.getItem("accessToken")) {
                setUserLoaded(true);
                return;
            }
            if (user) {
                setUserLoaded(true);
                return;
            }
            if (userRequest) {
                return;
            }
            if (userSuccess || userFailed) {
                setUserLoaded(true);
                return;
            }
            await dispatch(getAuthUser());
        };
        init();
    }, [dispatch, forAuth, user, userRequest, userSuccess, userFailed]);

    if (!isUserLoaded) {
        return null;
    }

    if (forAuth) {
        return !isAuth ? element : <Navigate to="/profile" replace />;
    } else {
        return isAuth ? element : <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
}
