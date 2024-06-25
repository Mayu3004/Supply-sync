import { useEffect, useReducer } from "react";
import styles from "./Distributor.module.scss";
import { DistributorData, DistributorProps } from "./Distributor.types";
import { fetchDistributor } from "../../services/manufacturer.services";
import List from "../List/List";
import DistributorForm from "../DistributorForm/DistributorForm";
// import { distributorReducer, initialDistributorState } from "../../reducers/distributorReducer";
import { distributorReducer,initialDistributorState } from "./Distributor.state";

const Distributor = ({ }: DistributorProps) => {
    const [state, dispatch] = useReducer(distributorReducer, initialDistributorState);

    const { distributors, isModalAdd, isModalUpdate, isModalDelete, selectedDistributorId, selectedDistributor } = state;

    const onUpdate = (id: string) => {
        console.log("distributor update");
        const distributor = distributors?.find(distributor => distributor._id === id) || null;

        dispatch({ type: 'SET_SELECTED_DISTRIBUTOR', payload: distributor });
        dispatch({ type: 'SET_SELECTED_DISTRIBUTOR_ID', payload: id });
        dispatch({ type: 'SET_IS_MODAL_UPDATE', payload: true });
    };

    const onDelete = (id: string) => {
        console.log("distributor deleted");
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

    useEffect(() => {
        const fetchDistributorHandler = async () => {
            const value = await fetchDistributor();
            console.log(value.data);

            dispatch({ type: 'SET_DISTRIBUTORS', payload: value.data });
        };

        fetchDistributorHandler();
    }, []);

    return (
        <div className={styles.DistributorContainer}>
            <button
                className={styles.AddBtn}
                onClick={handleClick}
            > <strong>+</strong> ADD
            </button>
            <div className={styles.DistributorDataContainer} >
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
            {isModalAdd && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <DistributorForm isModalAdd={isModalAdd} closeModal={closeModal} dispatch = {dispatch}/>
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
                            dispatch = {dispatch}
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
                            dispatch = {dispatch}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Distributor;
