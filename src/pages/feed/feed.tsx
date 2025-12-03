import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useEffect } from "react";
import { wsConnect, wsDisconnect } from "../../services/middleware/action-types";

export function Feed() {
    const dispatch = useDispatch();
    const { orders, isConnected, error } = useSelector((state: RootState) => state.ordersWS);

    useEffect(() => {
        // Подключаемся к WebSocket
        dispatch(wsConnect("wss://norma.education-services.ru/orders/all"));

        // Отключаемся при размонтировании
        return () => {
            dispatch(wsDisconnect());
        };
    }, [dispatch]);

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
            <div>
                <h2>Заказы ({isConnected ? "онлайн" : "оффлайн"})</h2>
                <ul>
                    {orders?.orders.map((order) => (
                        <li key={order._id}>
                            <p>Номер заказа: {order.number}</p>
                            <p>Статус: {order.status}</p>
                            <p>Дата: {new Date(order.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div></div>
        </div>
    );
}
