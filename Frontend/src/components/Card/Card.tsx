import styles from "./Card.module.scss"; 
import { CardProps } from "./Card.types.ts" 
 
const Card = ({ title,description,price,photoUrl,quantity,points,onUpdate,onDelete,children}: CardProps) => { 
    return (
        <div className={styles.CardContainer}>
          {photoUrl && <img className={styles.CardImage} src={photoUrl} alt={title} />}
          <div className={styles.CardInfo}>
            <h3>{title}</h3>
            <p>{description}</p>
            {price && <p>Price: ${price}</p>}
            {/* {quantity && <p>Quantity: {quantity}</p>} */}
            {points && <p>Points to earn: {points}</p>}
            {children}
          </div>
            <div className={styles.ButtonContainer}>
              {onDelete && <button onClick={onDelete} className={`${styles.Button} ${styles.DeleteBtn}`}>Delete</button>}
              {onUpdate && <button onClick={onUpdate} className={`${styles.Button} ${styles.EditBtn}`}>Update</button>}
            </div>
        </div>
      );
} 
 
export default Card;
