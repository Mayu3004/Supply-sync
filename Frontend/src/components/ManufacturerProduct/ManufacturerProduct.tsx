import { useEffect, useReducer } from "react";
import Card from "../Card/Card.tsx";
import styles from "./ManufacturerProduct.module.scss";
import { ManufacturerProductProps, Product } from "./ManufacturerProduct.types.ts";
import { fetchProducts } from "../../services/manufacturerProducts.services.ts";
import ProductForm from "../ProductForm/ProductForm.tsx";
import { initialManufacturerProductState,manufacturerProductReducer } from "./Manufacturer.state.ts";

const ManufacturerProduct = ({ }: ManufacturerProductProps) => {
    const [state, dispatch] = useReducer(manufacturerProductReducer, initialManufacturerProductState);

    const onUpdate = (id: string) => {
        console.log("Update");
        const product = state.products.find(product => product._id === id) || null;
        dispatch({ type: 'SET_MODAL_UPDATE', payload: { isOpen: true, product, productId: id } });
    };

    const onDelete = (id: string) => {
        console.log("Delete");
        dispatch({ type: 'SET_MODAL_DELETE', payload: { isOpen: true, productId: id } });
    };

    useEffect(() => {
        const fetchProductHandler = async () => {
            const value = await fetchProducts();
            dispatch({ type: 'SET_PRODUCTS', payload: value.data });
        };

        fetchProductHandler();
    }, []);

    const handleClick = () => {
        dispatch({ type: 'SET_MODAL_ADD', payload: true });
    };

    const closeModal = () => {
        dispatch({ type: 'SET_MODAL_ADD', payload: false });
        dispatch({ type: 'SET_MODAL_UPDATE', payload: { isOpen: false, product: null, productId: null } });
        dispatch({ type: 'SET_MODAL_DELETE', payload: { isOpen: false, productId: null } });
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
                {state.products.map((product, index) => (
                    <Card
                        key={index}
                        title={product.productName}
                        description={product.productDescription}
                        price={product.productPrice}
                        // quantity={product.quantity}
                        photoUrl={product.productImage}
                        onDelete={() => { onDelete(product._id) }}
                        onUpdate={() => { onUpdate(product._id) }}
                    />
                ))}
            </div>
            {state.isModalAdd && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <ProductForm isModalAdd={state.isModalAdd} closeModal={closeModal} />
                    </div>
                </div>
            )}
            {state.isModalUpdate && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <ProductForm
                            isModalUpdate={state.isModalUpdate}
                            productID={state.selectedProductId}
                            product={state.selectedProduct}
                            closeModal={closeModal}
                        />
                    </div>
                </div>
            )}
            {state.isModalDelete && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <ProductForm
                            isModalDelete={state.isModalDelete}
                            productID={state.selectedProductId}
                            closeModal={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManufacturerProduct;
