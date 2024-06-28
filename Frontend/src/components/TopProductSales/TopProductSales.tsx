import { useReducer, useState } from "react";
import styles from "./TopProductSales.module.scss";
import { ProductData, TopProductSalesProps } from "./TopProductSales.types.ts"
import List from "../List/List.tsx";
import { fetchTopProducts } from "../../services/manufacturer.services.ts";
import { initialTopProductSalesState, topProductSalesReducer } from "./TopProduct.state.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateForm, DateSchema } from "../TopPerformers/TopPerformers.types.ts";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const TopProductSales = ({ }: TopProductSalesProps) => {
    const [state, dispatch] = useReducer(topProductSalesReducer, initialTopProductSalesState);
    const { register, handleSubmit, formState: { errors } } = useForm<DateForm>({
        resolver: zodResolver(DateSchema)
    });

    const fetchTopProductHandler = async (formData:DateForm) => {
        try {
            const value = await fetchTopProducts(formData.startDate, formData.endDate);
            dispatch({ type: 'SET_PRODUCTS', payload: value.data });
            dispatch({ type: 'SET_IS_FETCHED', payload: true });
        } catch (error) {
            console.error('Error fetching performers:', error);
        }
    };

    const onHandleSubmit = (formData: DateForm) => {
        const startdate = new Date(formData.startDate);
        const enddate = new Date(formData.endDate);
        if (startdate <= enddate) {
            fetchTopProductHandler(formData);
        } else {
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
                <button type="submit" className={styles.SubmitBtn}>Fetch Products</button>
            </form>

            {state.isFetched && (
                <div className={styles.DistributorDataContainer}>
                    {state.products.map((product, index) => (
                        <List
                            key={index}
                            name={product.productName}
                            sales={product.totalQuantitySold}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TopProductSales 
