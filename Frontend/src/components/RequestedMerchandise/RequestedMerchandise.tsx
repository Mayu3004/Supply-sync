 
import { useEffect, useState } from "react";
import styles from "./RequestedMerchandise.module.scss";
import { RequestedMerchandiseProps } from "./RequestedMerchandise.types";
import { MerchandiseData } from "../Merchandise/Merchandise.types";
import { fetchMerchandiseByStatus } from "../../services/DistributorProduct.services";
import MerchandiseCard from "../MerchandiseCard/MerchandiseCard";
import Pagination from "../Pagination/Pagination"; // Import Pagination component

const RequestedMerchandise = ({}: RequestedMerchandiseProps) => {
    const [merchandises, setMerchandises] = useState<MerchandiseData[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(10);
    const [status, setStatus] = useState<string>("pending"); // Default status is pending

    useEffect(() => {
        fetchData(status, currentPage);
    }, [status,currentPage]);

    const fetchData = async (status: string, page: number) => {
        try {
            const value = await fetchMerchandiseByStatus(status, page);
            setMerchandises(value.data);
            
        } catch (error) {
            console.error(`Error fetching ${status} merchandise:`, error);
        }
    };

    const handlePendingClick = () => {
        setStatus("pending");
        setCurrentPage(1); 
    };

    const handleCompletedClick = () => {
        setStatus("completed");
        setCurrentPage(1); 
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchData(status,page)
    };
   
    

    return (
        <div className={styles.RequestedMerchandiseContainer}>
            <div className={styles.ButtonsContainer}>
                <button className={`${styles.Button} ${styles.DeleteBtn}`} onClick={handlePendingClick}>
                    View Pending
                </button>
                <button className={`${styles.Button} ${styles.EditBtn}`} onClick={handleCompletedClick}>
                    View Completed
                </button>
            </div>
            <div className={styles.MerchandiseContainer}>
                {merchandises.map((merchandise, index) => (
                    <MerchandiseCard key={index} merchandise={merchandise} />
                ))}
            </div>
            <div className={styles.Footer}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default RequestedMerchandise;
