import styles from "./Distributor.module.scss"; 
import { DistributorProps } from "./Distributor.types.ts" 
 
const Distributor = ({}: DistributorProps) => { 
    const [merchandises, setMerchandises] = useState<MerchandiseData[]>()
    return(
        <div className={styles.MerchandiseContainer}>
            <button className={styles.AddBtn}>ADD</button>
            <div className={styles.MerchandiseDataContainer} >
                {merchandises?.map((merchandise, index) => (
                    <Card
                        key={index}
                        title={merchandise.itemName}
                        description={merchandise.details}
                        points={merchandise.points}
                        photoUrl={merchandise.photoUrl}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>
            </div>
    )
} 
 
export default Distributor 
