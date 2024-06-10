import { useEffect, useState } from "react";
import Card from "../Card/Card.tsx";
import styles from "./ManufacturerProduct.module.scss";
import { ManufacturerProductProps, Product } from "./ManufacturerProduct.types.ts"
import { fetchProducts } from "../../services/manufacturerProducts.services.ts";
import ProductForm from "../ProductForm/ProductForm.tsx";

const ManufacturerProduct = ({ }: ManufacturerProductProps) => {
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
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

    const handleClick = () =>{
        setIsModalOpen(true);

        // console.log("clicked");   
    }
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.ManufacturerProductContainer}>
            <button 
                className={styles.AddBtn}
                onClick={handleClick}    
            >
                    ADD
                </button>
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
            {isModalOpen && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <ProductForm />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManufacturerProduct 
