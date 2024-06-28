import { useForm } from "react-hook-form";
import SalesChart from "../SalesChart/SalesChart.tsx";
import { DateForm, DateSchema } from "../TopPerformers/TopPerformers.types.ts";
import styles from "./DisplayManufacturerSales.module.scss"; 
import { DisplayManufacturerSalesProps, SalesData } from "./DisplayManufacturerSales.types.ts" 
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {  useReducer } from "react";
import { initialSalesState, salesReducer } from "./DisplayManufacturer.state.ts";
import { fetchSales } from "../../services/manufacturer.services.ts";
 

const DisplayManufacturerSales = ({}: DisplayManufacturerSalesProps) => { 

    const [state, dispatch] = useReducer(salesReducer, initialSalesState)
    const { register, handleSubmit, formState: { errors } } = useForm<DateForm>({
        resolver: zodResolver(DateSchema)
    });

    const fetchSalesHandler = async (formData:DateForm) => {
        try {
            const value = await fetchSales(formData.startDate, formData.endDate);
            dispatch({ type: 'SET_SALES', payload: value.data });
            dispatch({ type: 'SET_IS_FETCHED', payload: true });
        } catch (error) {
            console.error('Error fetching performers:', error);
        }
    };
    const onHandleSubmit = async(formData: DateForm) => { 
        const startdate = new Date(formData.startDate);
        const enddate = new Date(formData.endDate);
        if(startdate<=enddate){
            await fetchSalesHandler(formData);
           
        }else{
            toast.error("End date greater than start date")
        }
        
    }; 
    
    return (
        <div className={styles.SalesContainer}>
            <h1>Sales Data</h1>
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
                <button type="submit" className={styles.SubmitBtn}>Fetch Sales</button>
            </form>
            {state.isFetched && (
                <div className={styles.ChartContainer}>
                    <SalesChart 
                        salesData={state.sales.map((item: SalesData) => item.totalQuantity)} 
                        productNames={state.sales.map((item: SalesData) => item.productName)} 
                    />
                </div>
            )}
        </div>
    );
};

 
export default DisplayManufacturerSales 
