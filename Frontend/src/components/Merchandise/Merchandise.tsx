import { useEffect, useState } from "react";
import Card from "../Card/Card.tsx";
import styles from "./Merchandise.module.scss";
import { MerchandiseData, MerchandiseProps } from "./Merchandise.types.ts"
import { fetchMerchandise } from "../../services/manufacturer/manufacturer.services.ts";

const Merchandise = ({ }: MerchandiseProps) => {
    const [merchandises, setMerchandises] = useState<MerchandiseData[]>()

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
                {/* Pending completed */}
            </div>

        </div>
    );
}

export default Merchandise 
