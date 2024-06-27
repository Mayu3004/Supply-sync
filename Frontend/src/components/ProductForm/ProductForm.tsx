
import { addProducts, deleteProduct, updateProduct } from '../../services/manufacturerProducts.services';
import styles from './ProductForm.module.scss';
import { ProductFormProps, ProductFormData, productFormSchema } from './ProductForm.types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useManufacturerProductContext } from '../ManufacturerProduct/ManufacturerProductContext';

const ProductForm = ({ isModalAdd, isModalUpdate, isModalDelete, productID, product, closeModal }: ProductFormProps) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormData>({
        resolver: zodResolver(productFormSchema)
    });

    const { dispatch } = useManufacturerProductContext();
    useEffect(() => {
        if (product) {
            setValue('productName', product.productName);
            setValue('productPrice', product.productPrice);
            setValue('productImage', product.productImage);
            setValue('productDescription', product.productDescription);
        }
    }, [product, setValue]);

    const onSubmit = async (data: ProductFormData) => {
        try {
            await addProducts(data);
            toast.success('Product added successfully');
            dispatch({ type: 'SET_REFRESH_PRODUCTS',payload:true });
            closeModal();
        } catch (error) {
            toast.error('Error adding product');
        }
    };

    const onSubmitUpdate = async (data: ProductFormData) => {
        try {
            if (!productID) throw new Error("ProductId undefined");
            await updateProduct(productID, data);
            toast.success('Product updated successfully');
            dispatch({ type: 'SET_REFRESH_PRODUCTS',payload:true });
            closeModal();
        } catch (error) {
            toast.error('Error updating product');
        }
    };

    const onClickDelete = async () => {
        try {
            if (!productID) throw new Error("ProductId undefined");
            await deleteProduct(productID);
            toast.success('Product deleted successfully');
            dispatch({ type: 'SET_REFRESH_PRODUCTS',payload:true });
            closeModal();
        } catch (error) {
            toast.error('Error deleting product');
        }
    };

    const onCancel = () => {
        closeModal();
    };

    const renderFormFields = () => (
        <>
            <div className={styles.FormGroup}>
                <label htmlFor="productName">Product Name</label>
                <input
                    type="text"
                    {...register('productName')}
                    placeholder="Product Name"
                />
                {errors.productName && <span className={styles.Error}>{errors.productName.message}</span>}
            </div>
            <div className={styles.FormGroup}>
                <label htmlFor="productPrice">Product Price</label>
                <input
                    type="number"
                    {...register('productPrice', { valueAsNumber: true })}
                    placeholder="Product Price"
                />
                {errors.productPrice && <span className={styles.Error}>{errors.productPrice.message}</span>}
            </div>
            <div className={styles.FormGroup}>
                <label htmlFor="productImage">Product Image URL</label>
                <input
                    type="text"
                    {...register('productImage')}
                    placeholder="Product Image URL"
                />
                {errors.productImage && <span className={styles.Error}>{errors.productImage.message}</span>}
            </div>
            <div className={styles.FormGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                    {...register('productDescription')}
                    placeholder="Description"
                ></textarea>
                {errors.productDescription && <span className={styles.Error}>{errors.productDescription.message}</span>}
            </div>
        </>
    );

    return (
        <div className={styles.ProductFormContainer}>
            
            {isModalAdd && (
                <>
                    <h2>Add New Product</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
                        {renderFormFields()}
                        <div className={styles.ButtonContainer}>
                            <button type="button" onClick={onCancel} className={`${styles.Button} ${styles.DeleteBtn}`}>CANCEL</button>
                            <button type="submit" className={`${styles.Button} ${styles.EditBtn}`}>SAVE</button>
                            <ToastContainer />
                        </div>
                    </form>
                </>
            )}
            {isModalUpdate && (
                <>
                    <h2>Update Product</h2>
                    <form onSubmit={handleSubmit(onSubmitUpdate)} className={styles.Form}>
                        {renderFormFields()}
                        <div className={styles.ButtonContainer}>
                            <button type="button" onClick={onCancel} className={`${styles.Button} ${styles.DeleteBtn}`}>CANCEL</button>
                            <button type="submit" className={`${styles.Button} ${styles.EditBtn}`}>SAVE</button>
                        </div>
                            <ToastContainer />
                    </form>
                </>
            )}
            {isModalDelete && (
                <>
                    <h2>Are you sure?</h2>
                    <div className={styles.Form}>
                        <div className={styles.ButtonContainer}>
                            <button type="button" onClick={onCancel} className={`${styles.Button} ${styles.DeleteBtn}`}>CANCEL</button>
                            <button type="button" onClick={onClickDelete} className={`${styles.Button} ${styles.EditBtn}`}>CONFIRM</button>
                            <ToastContainer />
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default ProductForm;
