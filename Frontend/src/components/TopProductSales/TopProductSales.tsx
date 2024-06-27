import { useState } from "react";
import styles from "./TopProductSales.module.scss"; 
import { ProductData, TopProductSalesProps } from "./TopProductSales.types.ts" 
import List from "../List/List.tsx";
import { fetchTopProducts } from "../../services/manufacturer.services.ts";
 
const TopProductSales = ({}: TopProductSalesProps) => { 
    const [products, setProducts] = useState<ProductData[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [isFetched, setIsFetched] = useState<boolean>(false);

    const fetchTopProductHandler = async () => {
        if (startDate && endDate) {
            const value = await fetchTopProducts(startDate, endDate);
            
            if (value) {
                setProducts(value.data);
                setIsFetched(true);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchTopProductHandler();
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
                <button type="submit" className={styles.SubmitBtn}>Fetch Products</button>
            </form>

            {isFetched && (
                <div className={styles.DistributorDataContainer}>
                    {products.map((product, index) => (
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
