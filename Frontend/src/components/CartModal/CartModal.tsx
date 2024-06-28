import { useState } from "react";
import styles from "./CartModal.module.scss"; 
import { CartModalProps } from "./CartModal.types.ts" 
import { CartItem } from "../DistributorProduct/DistributorProduct.state.ts";
 
const CartModal = ({cartItems, onClose, onConfirm}: CartModalProps) => {

    const [updatedCart, setUpdatedCart] = useState<CartItem[]>(cartItems);

    const handleQuantityChange = (index: number, quantity: number) => {
        const newCart = [...updatedCart];
        newCart[index].quantity = quantity;
        setUpdatedCart(newCart);
    };

    return (
        <div className={styles.Modal}>
            <div className={styles.ModalContent}>
            <button className={styles.CloseBtn} onClick={onClose}>X</button>
                <h2>Cart</h2>
                {updatedCart.map((item, index) => (
                    <div key={index} className={styles.CartItem}>
                        <span>{item.product.productName}</span>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                            min={1}
                        />
                    </div>
                ))}
                <div className={styles.ButtonContainer}>
                    <button onClick={onClose} className={`${styles.Button} ${styles.CancelBtn}`}>Cancel</button>
                    <button onClick={() => onConfirm(updatedCart)} className={`${styles.Button} ${styles.ConfirmBtn}`}>Confirm</button>
                </div>
            </div>
        </div>
    ); 
} 
 
export default CartModal 
