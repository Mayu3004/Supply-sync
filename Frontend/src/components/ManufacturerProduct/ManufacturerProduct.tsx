import { useEffect, useState } from "react";
import Card from "../Card/Card.tsx";
import styles from "./ManufacturerProduct.module.scss";
import { ManufacturerProductProps, Product } from "./ManufacturerProduct.types.ts"
import { fetchProducts } from "../../services/manufacturer/manufacturer.services.ts";

const ManufacturerProduct = ({ }: ManufacturerProductProps) => {

    const [products, setProduts] = useState<Product[]>();

    const onUpdate = () => {
        console.log("Update");

    }
    const onDelete = () => {
        console.log("Delete");

    }

    useEffect(() => {

        const fetchProductHandler = async () => {
            const value = await fetchProducts();
            setProduts(value)
        }

        fetchProductHandler()

    }, [])

    return (
        <div className={styles.ManufacturerProductContainer}>
            <button className={styles.AddBtn}>ADD</button>
            <div className={styles.DataContainer}>
                {products?.map((product, index) => (
                    <Card
                        key={index}
                        title={product.name}
                        description={product.description}
                        price={product.price}
                        quantity={product.quantity}
                        photoUrl={product.photoUrl}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>

        </div>
    );
}

export default ManufacturerProduct 
