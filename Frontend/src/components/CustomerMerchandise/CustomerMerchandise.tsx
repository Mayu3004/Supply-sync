import { useEffect, useState } from "react";
import Card from "../Card/Card.tsx";
import styles from "./CustomerMerchandise.module.scss";
import { fetchMerchandise } from "../../services/manufacturer.Merchandise.ts";
import { MerchandiseData } from "../Merchandise/Merchandise.types.ts";
import { CustomerMerchandiseProps } from "./CustomerMerchandise.types.ts";

const CustomerMerchandise = ({ }: CustomerMerchandiseProps) => {
    const [merchandises, setMerchandises] = useState<MerchandiseData[]>([]);

    useEffect(() => {
        const fetchMerchandiseHandler = async () => {
            try {
                const value = await fetchMerchandise();
                console.log(value.data);
                
                setMerchandises(value);
            } catch (error) {
                console.error("Error fetching merchandise:", error);
            }
        };

        fetchMerchandiseHandler();
    }, []);

    const handleRedeem = (id: string) => {
        console.log("Redeem merchandise with ID:", id);
        // Add your redeem logic here
    };

    return (
        <div className={styles.CustomerMerchandiseContainer}>
            <div className={styles.CustomerMerchandiseDataContainer}>
                {merchandises.map((merchandise, index) => (
                    <Card
                        key={index}
                        title={merchandise.merchandiseName}
                        description={merchandise.merchandiseDescription}
                        points={merchandise.pointsRequired}
                        photoUrl={merchandise.merchandiseImage}
                        onRedeem={() => handleRedeem(merchandise._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CustomerMerchandise;
