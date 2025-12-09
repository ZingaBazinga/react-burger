import styles from "./order.module.css";
import { useLocation, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getOrder, resetOrder, setOrder } from "../../services/orderSlice";
import { OrderContent } from "../../components/OrderContent";
import { useEffect } from "react";

export function Order() {
    const location = useLocation();
    const background = location.state?.background;
    const dispatch = useAppDispatch();
    const { orderItems } = useAppSelector((state) => state.order);
    const { orders } = useAppSelector((state) => state.ordersWS);
    const { id } = useParams();

    const handleClose = () => {
        dispatch(resetOrder());
        window.history.back();
    };

    useEffect(() => {
        if (id && !orderItems) {
            if (background && orders) {
                dispatch(setOrder(orders.orders.find((order) => order._id === id) || null));
            } else {
                dispatch(getOrder(id));
            }
        }
    }, [orderItems, orders, id, dispatch, background]);

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
