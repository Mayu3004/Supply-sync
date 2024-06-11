import { useEffect, useState } from "react";
import Card from "../Card/Card.tsx";
import styles from "./ManufacturerProduct.module.scss";
import { ManufacturerProductProps, Product } from "./ManufacturerProduct.types.ts"
import { fetchProducts } from "../../services/manufacturerProducts.services.ts";
import ProductForm from "../ProductForm/ProductForm.tsx";

const ManufacturerProduct = ({ }: ManufacturerProductProps) => {
    const [isModalAdd, setIsModalAdd] = useState<boolean>(false)
    const [isModalUpdate, setIsModalUpdate] = useState<boolean>(false)
    const [isModalDelete, setIsModalDelete] = useState<boolean>(false)
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [products, setProduts] = useState<Product[]>();

    const onUpdate = (id:string) => {
        console.log("Update");
        setIsModalUpdate(true)
        setSelectedProductId(id)
        
    }
    const onDelete = (id:string) => {
        console.log("Delete");
        setIsModalDelete(true)
        setSelectedProductId(id)

    }

    useEffect(() => {

        const fetchProductHandler = async () => {
            const value = await fetchProducts();
            setProduts(value)
        }

        fetchProductHandler()

    }, [])

    const handleClick = () => {
        setIsModalAdd(true);

        // console.log("clicked");   
    }
    const closeModal = () => {
        setIsModalAdd(false);
        setIsModalUpdate(false);
        setIsModalDelete(false);
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
                        onUpdate={()=>{onUpdate(product.id)}}
                        onDelete={()=>{onDelete(product.id)}}
                    />
                ))}
            </div>
            {isModalAdd && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <ProductForm isModalAdd={isModalAdd} />
                    </div>
                </div>
            )}
            {isModalUpdate && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <ProductForm 
                            isModalUpdate={isModalUpdate}
                            productID = {selectedProductId} 
                         />
                    </div>
                </div>
            )}

            {isModalDelete && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <ProductForm 
                            isModalDelete={isModalDelete}
                            productID = {selectedProductId}
                            closeModal = {closeModal} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManufacturerProduct 
