import { useEffect, useState } from "react";
import Card from "../Card/Card.tsx";
import styles from "./Merchandise.module.scss";
import { MerchandiseData, MerchandiseProps } from "./Merchandise.types.ts"
import { fetchMerchandise } from "../../services/manufacturer.Merchandise.ts";
import RequestMerchandise from "../RequestMerchandise/RequestMerchandise.tsx";

const Merchandise = ({ }: MerchandiseProps) => {
    const [merchandises, setMerchandises] = useState<MerchandiseData[]>()
    const [view, setView] = useState<'pending' | 'completed'>('pending');

    const onUpdate = () => {
        console.log("update");

    }

    const onDelete = () => {
        console.log("Delte");


    }


    useEffect(() => {

        const fetchMerchandiseHandler = async () => {
            const value = await fetchMerchandise();
            setMerchandises(value)
        }

        fetchMerchandiseHandler()

    }, [])


    return (
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

            <div className={styles.RequestContainer}>
            <div>
                    <span
                        className={view === 'pending' ? styles.Active : ''}
                        onClick={() => setView('pending')}
                    >
                        Pending
                    </span>
                    <span> / </span>
                    <span
                        className={view === 'completed' ? styles.Active : ''}
                        onClick={() => setView('completed')}
                    >
                        Completed
                    </span>
                </div>
                <RequestMerchandise status={view} />
            </div>

        </div>
    );
}

export default Merchandise 
