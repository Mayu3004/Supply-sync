

import { useEffect, useState } from "react";
import styles from "./CustomerMerchandise.module.scss";
import { CustomerMerchandiseProps } from "./CustomerMerchandise.types.ts";
import { redeeemMerchandiseRequest } from "../../services/DistributorProduct.services.ts";
import { MerchandiseData } from "../Merchandise/Merchandise.types.ts";
import { fetchMerchandise } from "../../services/manufacturer.Merchandise.ts";
import Card from "../Card/Card.tsx";
import RequestedMerchandise from "../RequestedMerchandise/RequestedMerchandise.tsx";

const CustomerMerchandise = ({ }: CustomerMerchandiseProps) => {
    const [merchandises, setMerchandises] = useState<MerchandiseData[]>([]);
    const [view, setView] = useState<string>("");
    const [mainView, setMainView] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");

    const handleRedeem = async (id: string) => {
        try {
            const response = await redeeemMerchandiseRequest(id);
            setModalMessage("Redeem sucessfully ");
        } catch (error) {
            setModalMessage("Insufficent Points to Redeem.");
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalMessage("");
    };

    const buttonClick = (viewStatus:string) =>{
        setView(viewStatus);
        setMainView(false);
        if(viewStatus===""){
            setMainView(true)
        }
    }

        useEffect(() => {
        const fetchMerchandiseHandler = async () => {
            try {
                const value = await fetchMerchandise();
                

                setMerchandises(value);
            } catch (error) {
                console.error("Error fetching merchandise:", error);
            }
        };

        fetchMerchandiseHandler();
    }, []);

    return (
        <div className={styles.CustomerMerchandiseContainer}>
            <div className={styles.ButtonContainer}>
                <button onClick={() => buttonClick('')} className={view === "pending" ? styles.ActiveBtn : ""}>All Merchandise</button>
                <button onClick={() => buttonClick('pending')} className={view === "pending" ? styles.ActiveBtn : ""}>Pending</button>
                <button onClick={() => buttonClick('completed')} className={view === "completed" ? styles.ActiveBtn : ""}>Completed</button>
            </div>
            <div className={styles.CustomerMerchandiseDataContainer}>
            {mainView && merchandises.map((merchandise, index:number) => (
                    <Card
                        key={index}
                        title={merchandise.merchandiseName}
                        description={merchandise.merchandiseDescription}
                        points={merchandise.pointsRequired}
                        photoUrl={merchandise.merchandiseImage}
                        onRedeem={() => handleRedeem(merchandise._id)}
                    />
                ))}
                {view === "pending" && <RequestedMerchandise status="pending" />}
                {view === "completed" && <RequestedMerchandise status="completed" />}
            </div>
                
            {modalOpen && (
                <div className={styles.ModalOverlay}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <p>{modalMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerMerchandise;

