import styles from "./order.module.css";
import { useLocation, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { resetOrder, setOrder } from "../../services/orderSlice";
import { OrderContent } from "../../components/OrderContent";
import { useEffect } from "react";
import { wsConnect, wsDisconnect } from "../../services/middleware/action-types";
import { WS_BASE_URL } from "../../utils/backend_api";

export function Order() {
    const location = useLocation();
    const background = location.state?.background;
    const dispatch = useAppDispatch();
    const { orderItems } = useAppSelector((state) => state.order);
    const { orders } = useAppSelector((state) => state.ordersWS);
    const { id } = useParams();

    const { isConnected } = useAppSelector((state) => state.ordersWS);

    const handleClose = () => {
        dispatch(resetOrder());
        window.history.back();
    };

    useEffect(() => {
        if (background) {
            if (!orderItems && orders && id) {
                dispatch(setOrder(orders.orders.find((order) => order._id === id) || null));
            }
        } else {
            if (!isConnected) {
                if (location.pathname.startsWith("/profile/orders")) {
                    const accessToken = localStorage.getItem("accessToken")?.replace("Bearer ", "") || "";
                    dispatch(wsConnect(`${WS_BASE_URL}/orders?token=${accessToken}`));
                } else {
                    dispatch(wsConnect(`${WS_BASE_URL}/orders/all`));
                }
            }

            if (!orderItems && orders && id) {
                dispatch(setOrder(orders.orders.find((order) => order._id === id) || null));
            }
            return () => {
                dispatch(wsDisconnect());
            };
        }
    }, [orderItems, orders, id, dispatch, background, isConnected, location.pathname]);

    if (background) {
        return (
            <Modal onClose={handleClose} header={orderItems?.number ? `#${orderItems.number}` : "Детали заказа"}>
                <OrderContent />
            </Modal>
        );
    }

    return (
        <div className={styles.container}>
            {orderItems?.number ? <h1 className="text text_type_digits-default">#{orderItems.number}</h1> : null}
            <OrderContent />
        </div>
    );
}
