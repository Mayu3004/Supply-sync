
import { useEffect, useReducer, useState } from "react";
import styles from "./Distributor.module.scss";
import { DistributorData, DistributorProps } from "./Distributor.types";
import { fetchDistributor } from "../../services/manufacturer.services";
import List from "../List/List";
import DistributorForm from "../DistributorForm/DistributorForm";
import { distributorReducer, initialDistributorState } from "./Distributor.state";
import Pagination from "../Pagination/Pagination";

const Distributor = ({ }: DistributorProps) => {
    const [state, dispatch] = useReducer(distributorReducer, initialDistributorState);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(10);

    const { distributors, isModalAdd, isModalUpdate, isModalDelete, selectedDistributorId, selectedDistributor } = state;

    const onUpdate = (id: string) => {
        const distributor = distributors?.find(distributor => distributor._id === id) || null;
        dispatch({ type: 'SET_SELECTED_DISTRIBUTOR', payload: distributor });
        dispatch({ type: 'SET_SELECTED_DISTRIBUTOR_ID', payload: id });
        dispatch({ type: 'SET_IS_MODAL_UPDATE', payload: true });
    };

    const onDelete = (id: string) => {
        dispatch({ type: 'SET_IS_MODAL_DELETE', payload: true });
        dispatch({ type: 'SET_SELECTED_DISTRIBUTOR_ID', payload: id });
    };

    const handleClick = () => {
        dispatch({ type: 'SET_IS_MODAL_ADD', payload: true });
    };

    const closeModal = () => {
        dispatch({ type: 'SET_IS_MODAL_ADD', payload: false });
        dispatch({ type: 'SET_IS_MODAL_UPDATE', payload: false });
        dispatch({ type: 'SET_IS_MODAL_DELETE', payload: false });
    };

    const fetchDistributorHandler = async (page: number) => {
        console.log("hit");
        
        try {
            const response = await fetchDistributor(page);

            console.log(response.data);
            
            dispatch({ type: 'SET_DISTRIBUTORS', payload: response.data });
            // setTotalPages(response.data.totalPages);  // Update totalPages state
        } catch (error) {
            console.error("Failed to fetch distributors", error);
        }
    };

    useEffect(() => {
        fetchDistributorHandler(currentPage);
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchDistributorHandler(page)
    };

    return (
        <div className={styles.DistributorContainer}>
            <button className={styles.AddBtn} onClick={handleClick}>
                <strong>+</strong> ADD
            </button>
            <div className={styles.DistributorDataContainer}>
                {distributors?.map((distributor, index) => (
                    <List
                        key={index}
                        name={distributor.name}
                        contact={distributor.mobileNumber}
                        points={distributor.totalPoints}
                        onUpdate={() => { onUpdate(distributor._id) }}
                        onDelete={() => { onDelete(distributor._id) }}
                    />
                ))}
            </div>
            <div className={styles.Footer}>
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                />
            </div>
            {isModalAdd && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <DistributorForm isModalAdd={isModalAdd} closeModal={closeModal} dispatch={dispatch} />
                    </div>
                </div>
            )}
            {isModalUpdate && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <DistributorForm
                            isModalUpdate={isModalUpdate}
                            distributorID={selectedDistributorId}
                            distributor={selectedDistributor}
                            closeModal={closeModal}
                            dispatch={dispatch}
                        />
                    </div>
                </div>
            )}
            {isModalDelete && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <DistributorForm
                            isModalDelete={isModalDelete}
                            distributorID={selectedDistributorId} 
                            closeModal={closeModal}
                            dispatch={dispatch}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Distributor;



