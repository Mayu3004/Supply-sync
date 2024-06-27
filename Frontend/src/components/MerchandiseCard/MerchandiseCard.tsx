import { approveMerchandise } from "../../services/manufacturer.Merchandise.ts";
import styles from "./MerchandiseCard.module.scss";
import { MerchandiseCardProps } from "./MerchandiseCard.types.ts";

const MerchandiseCard = ({ merchandise }: MerchandiseCardProps) => {

    const handleCompleteOrder = async() => {
        
     
        const data = {userId:merchandise.distributorId,merchandiseId:merchandise.merchandiseId,status:"completed"}

      try{
        const response = await approveMerchandise(data);
       
        
      }catch(error){
        
      }
    };

    return (
        <div className={styles.MerchandiseCard}>
            {merchandise.merchandiseImage && <img className={styles.CardImage} src={merchandise.merchandiseImage} alt={merchandise.merchandiseName} />}
            <div className={styles.CardInfo}>
                <h3>Name: {merchandise.username}</h3>
                <h4>Merchandise: {merchandise.merchandiseName}</h4>
                {merchandise.status === "pending" &&<button className={`${styles.Button} ${styles.EditBtn}`} onClick={handleCompleteOrder}>
                    Complete Order
                </button>}
                <p>{merchandise.merchandiseDescription}</p>
                {merchandise.pointsRequired && <p>Points: {merchandise.pointsRequired}</p>}
            </div>
        </div>
    );
};

export default MerchandiseCard;
