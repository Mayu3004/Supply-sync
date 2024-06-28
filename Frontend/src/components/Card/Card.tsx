

import { useState } from "react";
import styles from "./Card.module.scss";
import { CardProps } from "./Card.types.ts";

const Card = ({ title, description, price, photoUrl, quantity, points, onUpdate, onDelete, onAddToCart, onRedeem, children }: CardProps) => {
    const [inputQuantity, setInputQuantity] = useState<number>(0);

    const handleQuantityChange = (e) => {
        setInputQuantity(Number(e.target.value));
    };
    
    

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(inputQuantity);
        }
    };

    return (
        <div className={styles.CardContainer}>
            {photoUrl && <img className={styles.CardImage} src={photoUrl} alt={title} />}
            <div className={styles.CardInfo}>
                <h3>{title}</h3>
                <p>{description}</p>
                {price && <p>Price: ${price}</p>}
                {quantity && <p>Quantity: {quantity}</p>}
                {points && <p>Points to earn: {points}</p>}
                {children}
                {onAddToCart && (
                    <div className={styles.InventoryQuantity}>
                        <label htmlFor="quantity">Required Quantity: </label>
                        <input
                            type="number"
                            id="quantity"
                            value={inputQuantity}
                            onChange={handleQuantityChange}
                            min='1'
                        />
                    </div>
                )}
            </div>
            <div className={styles.ButtonContainer}>
                {onDelete && <button onClick={onDelete} className={`${styles.Button} ${styles.DeleteBtn}`}>Delete</button>}
                {onUpdate && <button onClick={onUpdate} className={`${styles.Button} ${styles.EditBtn}`}>Update</button>}
                {onAddToCart && <button onClick={handleAddToCart} className={`${styles.Button} ${styles.EditBtn}`}>Add to cart</button>}
                {onRedeem && <button onClick={onRedeem} className={`${styles.Button} ${styles.EditBtn}`}>Redeem</button>}
            </div>
        </div>
    );
};

export default Card;

