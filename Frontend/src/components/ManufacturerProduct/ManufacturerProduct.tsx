
import { useEffect } from "react";
import Card from "../Card/Card";
import styles from "./ManufacturerProduct.module.scss";
import { fetchProducts } from "../../services/manufacturerProducts.services";
import ProductForm from "../ProductForm/ProductForm";
import Pagination from "../Pagination/Pagination";
import { ManufacturerProductProvider, useManufacturerProductContext } from "./ManufacturerProductContext";
import { ToastContainer } from "react-toastify";

const ManufacturerProduct = () => {
    const { state, dispatch } = useManufacturerProductContext();

    const onUpdate = (id: string) => {
        const product = state.products.find(product => product._id === id) || null;
        dispatch({ type: 'SET_MODAL_UPDATE', payload: { isOpen: true, product, productId: id } });
    };

    const onDelete = (id: string) => {
        dispatch({ type: 'SET_MODAL_DELETE', payload: { isOpen: true, productId: id } });
    };

    const fetchProductHandler = async (currentPage: number) => {
        const value = await fetchProducts(currentPage);
        dispatch({ type: 'SET_PRODUCTS', payload: value.data });
    };

    useEffect(() => {
        fetchProductHandler(state.currentPage);
    }, [state.currentPage]);

    useEffect(() => {
        if (state.refreshProducts) {
            fetchProductHandler(state.currentPage);
            dispatch({ type: 'SET_REFRESH_PRODUCTS', payload: false });
        }
    }, [state.refreshProducts, state.currentPage]);

    const handlePageChange = (page: number) => {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    };

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
            <button className={styles.AddBtn} onClick={handleClick}>
                ADD
            </button>
            <div className={styles.DataContainer}>
                {state.products.map((product, index) => (
                    <Card
                        key={index}
                        title={product.productName}
                        description={product.productDescription}
                        price={product.productPrice}
                        photoUrl={product.productImage}
                        onDelete={() => onDelete(product._id)}
                        onUpdate={() => onUpdate(product._id)}
                    />
                ))}
            </div>
            <div className={styles.Footer}>
                <Pagination
                    currentPage={state.currentPage}
                    totalPages={state.totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            {state.isModalAdd && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>
                            X
                        </button>
                        <ProductForm isModalAdd={state.isModalAdd} closeModal={closeModal} />
                        
                    </div>
                </div>
            )}
            {state.isModalUpdate && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>
                            X
                        </button>
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
                        <button className={styles.CloseBtn} onClick={closeModal}>
                            X
                        </button>
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

const ManufacturerProductWrapper = () => (
    <ManufacturerProductProvider>
        <ManufacturerProduct />
    </ManufacturerProductProvider>
);

export default ManufacturerProductWrapper;

