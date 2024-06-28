
import { useEffect, useReducer } from "react";
import styles from "./DistributorProduct.module.scss";
import { distributorInventoryReducer, initialDistributorInventoryState } from "./DistributorProduct.state";
import { DistributorProductProps } from "./DistributorProduct.types";
import Card from "../Card/Card";
import { IProduct } from "../ManufacturerInventory/ManufacturerInventory.types";
import { fetchDistributorInventory, submitOrder } from "../../services/DistributorProduct.services";
import CartModal from "../CartModal/CartModal";
import { DistributorProductProvider, useDistributorProduct } from "./DistributorProductContext";
import { toast } from "react-toastify";

const DistributorProduct = ({ }: DistributorProductProps) => {
    // const [state, dispatch] = useReducer(distributorInventoryReducer, initialDistributorInventoryState);
    const { state, dispatch } = useDistributorProduct();

    const onAddToCart = (product: IProduct, quantity: number) => {

        dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    };

    const handleClick = () => {
        dispatch({ type: 'OPEN_MODAL' });
    };

    const handleConfirmOrder = async (updatedCart: { product: IProduct; quantity: number }[]) => {
        const orderData = updatedCart.map(item => ({
            productId: item.product._id,
            quantity: item.quantity
        }));
        const quantity = orderData.map(quan => quan.quantity);
        



        try {
            if (quantity.includes(0)) {
                toast.error("Product Quantity is zero please add quantity")
            } else {
                await submitOrder(orderData);
                dispatch({ type: 'CLEAR_CART' });
                dispatch({ type: 'CLOSE_MODAL' });
            }

        } catch (error) {
            console.error("Failed to submit order:", error);

        }
    };

    const handleCloseModal = () => {
        dispatch({ type: 'CLOSE_MODAL' });
    };

    useEffect(() => {
        const fetchInventoryHandler = async () => {
            const value = await fetchDistributorInventory();
            dispatch({ type: 'SET_PRODUCTS', payload: value.data });
        };

        fetchInventoryHandler();
    }, []);


    return (
        <div className={styles.ManufacturerProductContainer}>
            <button className={styles.AddBtn} onClick={handleClick}>
                ORDER
            </button>
            <div className={styles.DataContainer}>
                {state.products.filter(product => product.product !== null).map((inventoryProduct, index) => (
                    <Card
                        key={index}
                        title={inventoryProduct.product.productName}
                        description={inventoryProduct.product.productDescription}
                        price={inventoryProduct.product.productPrice}
                        quantity={inventoryProduct.quantity}
                        photoUrl={inventoryProduct.product.productImage}
                        onAddToCart={(quantity: number) => { onAddToCart(inventoryProduct.product, quantity) }}
                    />
                ))}
            </div>
            {state.isModalOpen && (
                <CartModal
                    cartItems={state.cart}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmOrder}
                />
            )}
        </div>
    );
};

const DistributorProductWrapper = () => (
    <DistributorProductProvider>
        <DistributorProduct />
    </DistributorProductProvider>
);

export default DistributorProductWrapper;
