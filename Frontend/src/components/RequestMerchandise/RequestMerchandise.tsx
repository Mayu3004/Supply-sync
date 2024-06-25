import { useEffect, useState } from "react";
import styles from "./RequestMerchandise.module.scss"; 
import { RequestMerchandiseProps } from "./RequestMerchandise.types.ts" 
import { MerchandiseData } from "../Merchandise/Merchandise.types.ts";
import { completeMerchandise, fetchCompletedMerchandise, fetchPendingMerchandise } from "../../services/manufacturer.Merchandise.ts";
import Card from "../Card/Card.tsx";
 
const RequestMerchandise = ({status}: RequestMerchandiseProps) => { 
    const [merchandises, setMerchandises] = useState<MerchandiseData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (status === 'pending') {
                const data = await fetchPendingMerchandise();
                setMerchandises(data);
            } else if (status === 'completed') {
                const data = await fetchCompletedMerchandise();
                setMerchandises(data);
            }
        };

        fetchData();
    }, [status]);

    const handleComplete = async () => {
        await completeMerchandise();
        // Update the state to remove the completed item from the list
        // setMerchandises(merchandises.filter(m => m.id !== id));
    };

    return (
        <>
        <div className={styles.RequestMerchandiseContainer}>
            {merchandises.map((merchandise) => (
                <Card
                    // key={merchandise.id}
                    title={merchandise.itemName}
                    description={merchandise.details}
                    points={merchandise.points}
                    photoUrl={merchandise.photoUrl}
                >
                    {status === 'pending' && (
                        <button onClick={() => handleComplete()} className={styles.CompleteBtn}>
                            Complete
                        </button>
                    )}
                </Card>
            ))}
        </div>
        </>
    );
} 
 
export default RequestMerchandise 
