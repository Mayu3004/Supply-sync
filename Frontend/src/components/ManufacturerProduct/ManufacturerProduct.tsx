import { useEffect, useState } from "react";
import Card from "../Card/Card.tsx";
import styles from "./ManufacturerProduct.module.scss";
import { ManufacturerProductProps, Product } from "./ManufacturerProduct.types.ts";
import { fetchProducts } from "../../services/manufacturerProducts.services.ts";
import ProductForm from "../ProductForm/ProductForm.tsx";

const ManufacturerProduct = ({ }: ManufacturerProductProps) => {
    const [isModalAdd, setIsModalAdd] = useState<boolean>(false);
    const [isModalUpdate, setIsModalUpdate] = useState<boolean>(false);
    const [isModalDelete, setIsModalDelete] = useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>();

    const onUpdate = (id: string) => {
        console.log("Update");
        const product = products?.find(product => product.id === id) || null;
        setSelectedProduct(product);
        setIsModalUpdate(true);
        setSelectedProductId(id);
    };

    const onDelete = (id: string) => {
        console.log("Delete");
        setIsModalDelete(true);
        setSelectedProductId(id);
    };

    useEffect(() => {
        const fetchProductHandler = async () => {
            const value = await fetchProducts();
            setProducts(value.data);
        };

        fetchProductHandler();
    }, []);

    const handleClick = () => {
        setIsModalAdd(true);
    };

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
                        title={product.productName}
                        description={product.productDescription}
                        price={product.productPrice}
                        // quantity={product.quantity}
                        photoUrl={product.productImage}
                        onDelete={() => { onDelete(product.id) }}
                        onUpdate={() => { onUpdate(product.id) }}
                    />
                ))}
            </div>
            {isModalAdd && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <ProductForm isModalAdd={isModalAdd} closeModal={closeModal} />
                    </div>
                </div>
            )}
            {isModalUpdate && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <ProductForm
                            isModalUpdate={isModalUpdate}
                            productID={selectedProductId}
                            product={selectedProduct}
                            closeModal={closeModal}
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
                            productID={selectedProductId}
                            closeModal={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManufacturerProduct;
