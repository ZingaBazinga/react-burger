import { useState, useRef } from "react";
import { backendApi } from "../../../utils/backend_api";
import { IIngredient } from "../../../entities/ingredient";

export const GetIngredients = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<IIngredient[]>();
    const hasFetched = useRef(false);

    const getData = async () => {
        if (hasFetched.current) return;

        hasFetched.current = true;
        setIsLoading(true);
        fetch(`${backendApi}/api/ingredients`)
            .then((res) => {
                return res.json();
            })
            .then((jsonData) => {
                setData(jsonData.data);
            })
            .catch((err) => {
                throw err;
            })
            .finally(() => setIsLoading(false));
    };

    return {
        res: data,
        loading: isLoading,
        fetch: getData,
    };
};
