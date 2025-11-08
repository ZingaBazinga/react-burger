import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuthUser } from "../services/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../services/store";

export function ProtectedRouteElement({ element, forAuth }: { element: React.ReactElement; forAuth?: boolean }): React.ReactElement | null {
    let { isAuth } = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const init = async () => {
            await dispatch(getAuthUser());
            setUserLoaded(true);
        };
        init();
    }, [dispatch]);

    if (!isUserLoaded) {
        return null;
    }

    if (forAuth) {
        return !isAuth ? element : <Navigate to="/profile" replace />;
    } else {
        return isAuth ? element : <Navigate to="/login" replace />;
    }
}
