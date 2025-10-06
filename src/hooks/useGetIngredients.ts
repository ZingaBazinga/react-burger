import { useState, useRef } from "react";
import { backendApi } from "../utils/backend_api";
import { IIngredient } from "../entities/ingredient";

export const useGetIngredients = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IIngredient[]>();
    const [error, setError] = useState<string>();
    const hasFetched = useRef(false);

    const getData = async () => {
        if (hasFetched.current) return;

        hasFetched.current = true;
        setLoading(true);
        fetch(`${backendApi}/api/ingredients`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then((jsonData) => {
                setData(jsonData.data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => setLoading(false));
    };

    return {
        res: data,
        loading,
        fetch: getData,
        error,
    };
};
