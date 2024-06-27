
import { useEffect, useReducer } from "react";
import styles from "./ProductOrders.module.scss";
import { ProductOrdersProps, Order } from "./ProductOrders.types";
import OrderCard from "../OrderCard/OrderCard";
import { completeOrder, fetchOrders } from "../../services/DistributorProduct.services";
import { ordersReducer, initialState } from "./ProductOrderReducer";
import Pagination from "../Pagination/Pagination"; 
import { toast } from "react-toastify";
import { ProductOrderProvider } from "./ProductOrdersContext";

const ProductOrders = ({ }: ProductOrdersProps) => {
    const [state, dispatch] = useReducer(ordersReducer, initialState);

    useEffect(() => {
        fetchData("pending", state.currentPage);
    }, []);

    const fetchData = async (status: string, page: number) => {
        try {
            const fetchedOrders = await fetchOrders(status, page);
            dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: { orders: fetchedOrders.data, totalPages: 10} });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCompleteOrder = async (orderId: string) => {
        try {
            await completeOrder(orderId);
            dispatch({ type: 'COMPLETE_ORDER', payload: orderId });
            toast.success("Order Updated successfully")
        } catch (error) {
            console.error('Error completing order:', error);
        }
    };

    const handleViewCompleted = async () => {
        try {
            await fetchData("completed", state.currentPage);
            dispatch({ type: 'SET_STATUS', payload: 'completed' });
        } catch (error) {
            console.error('Error fetching completed orders:', error);
        }
    };

    const handleRefreshOrders = async () => {
        try {
            await fetchData("pending", state.currentPage);
            dispatch({ type: 'SET_STATUS', payload: 'pending' });
        } catch (error) {
            console.error('Error refreshing orders:', error);
        }
    };

    const handlePageChange = (page: number) => {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
        fetchData(state.status, page);
    };

    return (
        <div className={styles.ProductOrdersContainer}>
            <div className={styles.ButtonsContainer}>
                <button className={`${styles.Button} ${styles.DeleteBtn}`} onClick={handleRefreshOrders}>
                    Refresh Orders
                </button>
                <button className={`${styles.Button} ${styles.EditBtn}`} onClick={handleViewCompleted}>
                    View Completed
                </button>
            </div>
            <div className={styles.OrdersContainer}>
                {state.orders.map(order => (
                    <OrderCard
                        key={order._id}
                        order={order}
                        onComplete={handleCompleteOrder}
                    />
                ))}
            </div>
            <div className={styles.Footer}>
                <Pagination
                    currentPage={state.currentPage}
                    totalPages={state.totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

// export default ProductOrders;

const ProductOrderWrapper = () => (
    <ProductOrderProvider>
        < ProductOrders/>
    </ProductOrderProvider>
);

export default ProductOrderWrapper;



