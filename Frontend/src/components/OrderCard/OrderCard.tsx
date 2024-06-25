import styles from "./OrderCard.module.scss";
import { OrderCardProps } from "./OrderCard.types";

const OrderCard = ({ order, onComplete }: OrderCardProps) => {
    return (
        <div className={styles.OrderCard}>
            <div className={styles.CardInfo}>
                <h3>{order.distributorName}</h3>
                <ul>
                    {order.products.map(product => (
                        <li key={product.productId}>
                            <span className={styles.ProductName}>{product.productName}</span>
                            <span className={styles.Quantity}>{product.quantity}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {order.status === 'pending' && (
                <div className={styles.ButtonContainer}>
                    <button className={`${styles.Button} ${styles.EditBtn}`} onClick={() => onComplete(order._id)}>
                        Complete Order
                    </button>
                </div>
            )}
        </div>
    );
}

export default OrderCard;
