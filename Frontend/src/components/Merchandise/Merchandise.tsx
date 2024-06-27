
import { useEffect, useState } from "react";
import Card from "../Card/Card.tsx";
import styles from "./Merchandise.module.scss";
import { MerchandiseData, MerchandiseProps } from "./Merchandise.types.ts"
import { deleteMerchandise, fetchMerchandise } from "../../services/manufacturer.Merchandise.ts";
import MerchandiseForm from "../MerchandiseForm/MerchandiseForm.tsx";
import { Outlet } from "react-router-dom";
import Pagination from "../Pagination/Pagination.tsx";

const Merchandise = ({ }: MerchandiseProps) => {
    const [merchandises, setMerchandises] = useState<MerchandiseData[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedMerchandise, setSelectedMerchandise] = useState<MerchandiseData | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(10);

    useEffect(() => {
        fetchMerchandiseHandler(currentPage);
    }, []);

    const fetchMerchandiseHandler = async (page:number) => {
        try {
            const value = await fetchMerchandise(page);
            setMerchandises(value);
        } catch (error) {
            console.error("Error fetching merchandise:", error);
        }
    }

    const handleUpdate = (merchandise: MerchandiseData) => {
        setSelectedMerchandise(merchandise);
        setModalOpen(true);
    };

    const handleDelete = async(id: string) => {
       
       

        try {
            const value = await deleteMerchandise(id);
         
            
        } catch (error) {
            console.error("Error fetching merchandise:", error);
        }
        
        // setMerchandises(prevMerchandises => prevMerchandises.filter(merchandise => merchandise._id !== id));
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedMerchandise(null);
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchMerchandiseHandler(page);
    };

    const handleSubmit = (formData: MerchandiseData) => {
       
        
       
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
           <div className={styles.Footer}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    
        
    );
}

export default Merchandise;

