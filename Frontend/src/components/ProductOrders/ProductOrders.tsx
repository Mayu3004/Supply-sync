
import { useEffect, useReducer, useState } from "react";
import styles from "./ProductOrders.module.scss";
import { ProductOrdersProps, Order, Distributor, Product } from "./ProductOrders.types";
import OrderCard from "../OrderCard/OrderCard";
// import { fetchDistributor } from "../../services/manufacturer.services";
// import { fetchProducts } from "../../services/manufacturerProducts.services";
import { completeOrder, fetchOrders } from "../../services/DistributorProduct.services";
import { ordersReducer, initialState } from "./ProductOrderReducer";
import Pagination from "../Pagination/Pagination"; // Import Pagination component

const ProductOrders = ({ }: ProductOrdersProps) => {
    const [state, dispatch] = useReducer(ordersReducer, initialState);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(10);

    useEffect(() => {
        fetchData("pending", currentPage);
    }, []);

    const fetchData = async (status: string, page: number) => {
        try {
            const fetchedOrders = await fetchOrders(status, page);
            dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: fetchedOrders.data });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleCompleteOrder = async (orderId: string) => {
        try {
            await completeOrder(orderId);
            dispatch({ type: 'COMPLETE_ORDER', payload: orderId });
        } catch (error) {
            console.error('Error completing order:', error);
        }
    };

    const handleViewCompleted = async () => {
        try {
            await fetchData("completed", currentPage);
            dispatch({ type: 'SET_STATUS', payload: 'completed' });
        } catch (error) {
            console.error('Error fetching completed orders:', error);
        }
    };

    const handleRefreshOrders = async () => {
        try {
            await fetchData("pending", currentPage);
            dispatch({ type: 'SET_STATUS', payload: 'pending' });
        } catch (error) {
            console.error('Error refreshing orders:', error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
   
        fetchData(state.status,page)
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
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                />
            </div>
        </div>
    );
};

export default ProductOrders;



