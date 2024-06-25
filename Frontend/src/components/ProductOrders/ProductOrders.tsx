

// import { useEffect, useState } from "react";
// import styles from "./ProductOrders.module.scss";
// import { ProductOrdersProps, Order, Distributor, Product } from "./ProductOrders.types";
// import OrderCard from "../OrderCard/OrderCard";
// import { fetchDistributor } from "../../services/manufacturer.services";
// import { fetchProducts } from "../../services/manufacturerProducts.services";
// import { completeOrder, fetchOrders } from "../../services/DistributorProduct.services";

// const ProductOrders = ({ }: ProductOrdersProps) => {
//     const [orders, setOrders] = useState<Order[]>([]);
//     const [distributors, setDistributors] = useState<Distributor[]>([]);
//     const [products, setProducts] = useState<Product[]>([]);

//     useEffect(() => {
//         fetchData("pending");
//     }, []);

//     const fetchData = async (status: string) => {
//         const fetchedOrders = await fetchOrders(status);
//         const fetchedDistributors = await fetchDistributor();
//         const fetchedProducts = await fetchProducts();

//         setDistributors(fetchedDistributors);
//         setProducts(fetchedProducts);

//         const enhancedOrders = fetchedOrders.data.map((order: { distributorId: string; products: Product[]; }) => {
//             const distributor = fetchedDistributors.data.find((d: { distributorId: string; }) => d._id === order.distributorId);
//             const enhancedProducts = order.products.map(p => {
//                 const product = fetchedProducts.data.find((prod: { productId: string; }) => prod._id === p.productId);
//                 return {
//                     ...p,
//                     productName: product ? product.productName : ""
//                 };
//             });

//             return {
//                 ...order,
//                 distributorName: distributor ? distributor.name : "",
//                 products: enhancedProducts
//             };
//         });

//         setOrders(enhancedOrders);
//     };

//     const handleCompleteOrder = async (orderId: string) => {
//         try {
//             await completeOrder(orderId);
//             // Update the status of the order locally in the state
//             setOrders(prevOrders =>
//                 prevOrders.map(order =>
//                     order._id === orderId ? { ...order, status: 'completed' } : order
//                 )
//             );
//         } catch (error) {
//             console.error('Error completing order:', error);
//         }
//     };

//     const handleViewCompleted = async () => {
//         try {
//             await fetchData("completed")
//         } catch (error) {
//             console.error('Error fetching completed orders:', error);
//         }
//     };

//     return (
//         <div className={styles.ProductOrdersContainer}>
//             <div className={styles.ButtonsContainer}>
//                 <button className={`${styles.Button} ${styles.DeleteBtn}`} onClick={() => { fetchData('pending') }}>
//                     Refresh Orders
//                 </button>
//                 <button className={`${styles.Button} ${styles.EditBtn}`} onClick={handleViewCompleted}>
//                     View Completed
//                 </button>
//             </div>
//             <div className={styles.OrdersContainer}>
//                 {orders.map(order => (
//                     <OrderCard
//                         key={order._id}
//                         order={order}
//                         onComplete={handleCompleteOrder}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProductOrders;


import { useEffect, useReducer } from "react";
import styles from "./ProductOrders.module.scss";
import { ProductOrdersProps, Order, Distributor, Product } from "./ProductOrders.types";
import OrderCard from "../OrderCard/OrderCard";
import { fetchDistributor } from "../../services/manufacturer.services";
import { fetchProducts } from "../../services/manufacturerProducts.services";
import { completeOrder, fetchOrders } from "../../services/DistributorProduct.services";
import { ordersReducer, initialState } from "./ProductOrderReducer";


const ProductOrders = ({ }: ProductOrdersProps) => {
    const [state, dispatch] = useReducer(ordersReducer, initialState);

    useEffect(() => {
        fetchData("pending");
    }, []);

    const fetchData = async (status: string) => {
        try {
            const fetchedOrders = await fetchOrders(status);
            const fetchedDistributors = await fetchDistributor();
            const fetchedProducts = await fetchProducts();

            dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: enhanceOrders(fetchedOrders.data, fetchedDistributors.data, fetchedProducts.data) });
            dispatch({ type: 'FETCH_DISTRIBUTORS_SUCCESS', payload: fetchedDistributors });
            dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: fetchedProducts });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const enhanceOrders = (orders: Order[], distributors: Distributor[], products: Product[]): Order[] => {
        return orders.map(order => {
            const distributor = distributors.find(d => d._id === order.distributorId);
            const enhancedProducts = order.products.map(p => {
                const product = products.find(prod => prod._id === p.productId);
                return {
                    ...p,
                    productName: product ? product.productName : ""
                };
            });

            return {
                ...order,
                distributorName: distributor ? distributor.name : "",
                products: enhancedProducts
            };
        });
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
            await fetchData("completed");
            dispatch({ type: 'SET_STATUS', payload: 'completed' });
        } catch (error) {
            console.error('Error fetching completed orders:', error);
        }
    };

    const handleRefreshOrders = async () => {
        try {
            await fetchData("pending");
            dispatch({ type: 'SET_STATUS', payload: 'pending' });
        } catch (error) {
            console.error('Error refreshing orders:', error);
        }
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
        </div>
    );
};

export default ProductOrders;


