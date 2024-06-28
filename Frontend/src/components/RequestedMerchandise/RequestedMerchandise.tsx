 
import { useEffect, useReducer } from "react";
import styles from "./RequestedMerchandise.module.scss";
import { RequestedMerchandiseProps } from "./RequestedMerchandise.types";
import { fetchMerchandiseByStatus } from "../../services/DistributorProduct.services";
import MerchandiseCard from "../MerchandiseCard/MerchandiseCard";
import Pagination from "../Pagination/Pagination";
import { initialState, merchandiseRequestReducer } from "./RequestedMerchandise.state";

const RequestedMerchandise = ({}: RequestedMerchandiseProps) => {
    const [state, dispatch] = useReducer(merchandiseRequestReducer, initialState);

    useEffect(() => {
        fetchData(state.status, state.currentPage);
    }, [state.status, state.currentPage]);

    const fetchData = async (status: string, page: number) => {
        try {
            const value = await fetchMerchandiseByStatus(status, page);
            dispatch({ type: "SET_MERCHANDISES", payload: value.data });
        } catch (error) {
            console.error(`Error fetching ${status} merchandise:`, error);
        }
    };

    const handlePendingClick = () => {
        dispatch({ type: "SET_STATUS", payload: "pending" });
        dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
    };

    const handleCompletedClick = () => {
        dispatch({ type: "SET_STATUS", payload: "completed" });
        dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
    };

    const handlePageChange = (page: number) => {
        dispatch({ type: "SET_CURRENT_PAGE", payload: page });
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
                {state.merchandises.map((merchandise, index) => (
                    <MerchandiseCard key={index} merchandise={merchandise} />
                ))}
            </div>
            <div className={styles.Footer}>
                <Pagination
                    currentPage={state.currentPage}
                    totalPages={state.totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default RequestedMerchandise;
