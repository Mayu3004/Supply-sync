
import { useEffect } from "react";
import styles from "./Distributor.module.scss";
import {  DistributorProps } from "./Distributor.types";
import { fetchDistributor } from "../../services/manufacturer.services";
import List from "../List/List";
import DistributorForm from "../DistributorForm/DistributorForm";
import Pagination from "../Pagination/Pagination";
import { DistributorProvider, useDistributorContext } from "./DistributorContext";

const Distributor = ({ }: DistributorProps) => {
    // const [state, dispatch] = useReducer(distributorReducer, initialDistributorState);
    const { state, dispatch } = useDistributorContext();

    // const { distributors, isModalAdd, isModalUpdate, isModalDelete, selectedDistributorId, selectedDistributor, currentPage, totalPages } = state;

    const onUpdate = (id: string) => {
        const distributor = state.distributors?.find(distributor => distributor._id === id) || null;
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
        try {
            const response = await fetchDistributor(page);
            dispatch({ type: 'SET_DISTRIBUTORS', payload: response.data });
        } catch (error) {
            console.error("Failed to fetch distributors", error);
        }
    };

    useEffect(() => {
        fetchDistributorHandler(state.currentPage);
    }, []);

    useEffect(() => {
        if (state.refreshDistributors) {
            fetchDistributorHandler(state.currentPage);
            dispatch({ type: 'SET_REFRESH_DISTRIBUTORS', payload: false });
        }
    }, [state.refreshDistributors, state.currentPage]);

    const handlePageChange = (page: number) => {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
        fetchDistributorHandler(page);
    };

    return (
        <div className={styles.DistributorContainer}>
            <button className={styles.AddBtn} onClick={handleClick}>
                <strong>+</strong> ADD
            </button>
            <div className={styles.DistributorDataContainer}>
                {state.distributors?.map((distributor, index) => (
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
                    currentPage={state.currentPage} 
                    totalPages={state.totalPages} 
                    onPageChange={handlePageChange} 
                />
            </div>
            {state.isModalAdd && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <DistributorForm isModalAdd={state.isModalAdd} closeModal={closeModal} />
                    </div>
                </div>
            )}
            {state.isModalUpdate && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <DistributorForm
                            isModalUpdate={state.isModalUpdate}
                            distributorID={state.selectedDistributorId}
                            distributor={state.selectedDistributor}
                            closeModal={closeModal}
                            // dispatch={dispatch}
                        />
                    </div>
                </div>
            )}
            {state.isModalDelete && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <DistributorForm
                            isModalDelete={state.isModalDelete}
                            distributorID={state.selectedDistributorId} 
                            closeModal={closeModal}
                            // dispatch={dispatch}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const DistributorWrapper = () => (
    <DistributorProvider>
        <Distributor />
    </DistributorProvider>
);

export default DistributorWrapper;


