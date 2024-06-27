
import {  useState } from "react";
import styles from "./TopPerformers.module.scss";
import { PerformerData, TopPerformersProps } from "./TopPerformers.types";
import List from "../List/List";
import { fetchPerformers } from "../../services/manufacturer.services";

const TopPerformers = ({ }: TopPerformersProps) => {
    const [performers, setPerformers] = useState<PerformerData[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [isFetched, setIsFetched] = useState<boolean>(false);

    const fetchPerformerHandler = async () => {
        if (startDate && endDate) {
            const value = await fetchPerformers(startDate, endDate);
           
            if (value) {
                setPerformers(value.data);
                setIsFetched(true);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPerformerHandler();
    };

    return (
        <div className={styles.DistributorContainer}>
            <form onSubmit={handleSubmit} className={styles.DateForm}>
                <div className={styles.FormGroup}>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.FormGroup}>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.SubmitBtn}>Fetch Performers</button>
            </form>

            {isFetched && (
                <div className={styles.DistributorDataContainer}>
                    {performers.map((performer, index) => (
                        <List
                            key={index}
                            name={performer.distributorName}
                            sales={performer.totalSales}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopPerformers;
