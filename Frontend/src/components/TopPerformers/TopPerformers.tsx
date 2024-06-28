
import { useReducer, useState } from "react";
import styles from "./TopPerformers.module.scss";
import { DateForm, DateSchema, PerformerData, TopPerformersProps } from "./TopPerformers.types";
import List from "../List/List";
import { fetchPerformers } from "../../services/manufacturer.services";
import { initialTopPerformersState, topPerformersReducer } from "./TopPerformer.state";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const TopPerformers = ({ }: TopPerformersProps) => {
    const [state, dispatch] = useReducer(topPerformersReducer, initialTopPerformersState)
    const { register, handleSubmit, formState: { errors } } = useForm<DateForm>({
        resolver: zodResolver(DateSchema)
    });


    const fetchPerformerHandler = async (formData:DateForm) => {
        try {
            const value = await fetchPerformers(formData.startDate, formData.endDate);
            dispatch({ type: 'SET_PERFORMERS', payload: value.data });
            dispatch({ type: 'SET_IS_FETCHED', payload: true });
        } catch (error) {
            console.error('Error fetching performers:', error);
        }
    };

    const onHandleSubmit = (formData: DateForm) => { 
        const startdate = new Date(formData.startDate);
        const enddate = new Date(formData.endDate);
        if(startdate<=enddate){
            fetchPerformerHandler(formData);
        }else{
            toast.error("End date greater than start date")
        }
        
    };

    return (
        <div className={styles.DistributorContainer}>
            <form onSubmit={handleSubmit(onHandleSubmit)} className={styles.DateForm}>
                <div className={styles.FormGroup}>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        {...register('startDate')}
                    />
                </div>
                <div className={styles.FormGroup}>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        {...register('endDate')}
                    />
                </div>
                <button type="submit" className={styles.SubmitBtn}>Fetch Performers</button>
            </form>

            {state.isFetched && (
                <div className={styles.DistributorDataContainer}>
                    {state.performers.map((performer, index) => (
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
