

import { useEffect, useState } from "react";
import Card from "../Card/Card.tsx";
import styles from "./Merchandise.module.scss";
import { MerchandiseData, MerchandiseProps } from "./Merchandise.types.ts"
import { fetchMerchandise } from "../../services/manufacturer.Merchandise.ts";
import MerchandiseForm from "../MerchandiseForm/MerchandiseForm.tsx";
import { Outlet } from "react-router-dom";

const Merchandise = ({ }: MerchandiseProps) => {
    const [merchandises, setMerchandises] = useState<MerchandiseData[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedMerchandise, setSelectedMerchandise] = useState<MerchandiseData | null>(null);

    useEffect(() => {
        const fetchMerchandiseHandler = async () => {
            try {
                const value = await fetchMerchandise();
                setMerchandises(value);
            } catch (error) {
                console.error("Error fetching merchandise:", error);
            }
        }

        fetchMerchandiseHandler();
    }, []);

    const handleUpdate = (merchandise: MerchandiseData) => {
        setSelectedMerchandise(merchandise);
        setModalOpen(true);
    };

    const handleDelete = (id: string) => {
       
        console.log("Delete merchandise with ID:", id);
        
        // setMerchandises(prevMerchandises => prevMerchandises.filter(merchandise => merchandise._id !== id));
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedMerchandise(null);
    };

    const handleSubmit = (formData: MerchandiseData) => {
       
        console.log("Form data submitted:", formData);
       
        setMerchandises(prevMerchandises => {
            const updatedMerchandises = [...prevMerchandises];
            const index = updatedMerchandises.findIndex(merchandise => merchandise._id === formData._id);
            if (index !== -1) {
                updatedMerchandises[index] = formData;
            } else {
                updatedMerchandises.push(formData); 
            }
            return updatedMerchandises;
        });
        closeModal();
    };

    return (
        
        <div className={styles.MerchandiseContainer}>
            
            <button className={styles.AddBtn} onClick={() => setModalOpen(true)}>ADD</button>
            
            <div className={styles.MerchandiseDataContainer}>
                {merchandises.map((merchandise, index) => (
                    <Card
                        key={index}
                        title={merchandise.merchandiseName}
                        description={merchandise.merchandiseDescription}
                        points={merchandise.pointsRequired}
                        photoUrl={merchandise.merchandiseImage}
                        onUpdate={() => handleUpdate(merchandise)}
                        onDelete={() => handleDelete(merchandise._id)}
                    />
                ))}
            </div>
            {modalOpen && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <MerchandiseForm
                            closeModal={closeModal}
                            handleSubmit={handleSubmit}
                            merchandise={selectedMerchandise}
                        />
                    </div>
                </div>
            )}
           
        </div>
   
        
    );
}

export default Merchandise;

