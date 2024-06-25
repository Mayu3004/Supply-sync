import { addProducts, deleteProduct, fetchProducts, updateProduct } from '../../services/manufacturerProducts.services';
import styles from './ProductForm.module.scss';
import { ProductFormProps, ProductFormData } from './ProductForm.types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const ProductForm = ({ isModalAdd, isModalUpdate, isModalDelete, productID, product, closeModal }: ProductFormProps) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormData>();

    useEffect(() => {
        if (product) {
            setValue('productName', product.productName);
            setValue('productPrice', product.productPrice);
            setValue('productImage', product.productImage);
            setValue('productDescription', product.productDescription);
        }
    }, [product, setValue]);

    const onSubmit = (data: ProductFormData) => {
        console.log(data);
        addProducts(data);
    };

    const onSubmitUpdate = async(data: ProductFormData) => {
        console.log(productID, data);
        if(!productID) throw "ProductId undefined"
        await updateProduct(productID,data);
        await fetchProducts();
        closeModal()
    };

    const onClickDelete = async() => {
        console.log(productID, "delete");
        //api delete
        if(!productID) throw "productId undefined"
        await deleteProduct(productID);
        closeModal();
    };

    const onCancel = () => {
        closeModal()
    }

    if (isModalAdd) {
        return (
            <div className={styles.ProductFormContainer}>
                <h2>Add New Product</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
                    <div className={styles.FormGroup}>
                        <label htmlFor="productName">Product Name</label>
                        <input
                            type="text"
                            {...register('productName', { required: 'Product name is required' })}
                            placeholder="Product Name"
                        />
                        {errors.productName && <span className={styles.Error}>{errors.productName.message}</span>}
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="productPrice">Product Price</label>
                        <input
                            type="number"
                            {...register('productPrice', { required: 'Product price is required', valueAsNumber: true })}
                            placeholder="Product Price"
                        />
                        {errors.productPrice && <span className={styles.Error}>{errors.productPrice.message}</span>}
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="productImage">Product Image URL</label>
                        <input
                            type="text"
                            {...register('productImage', { required: 'Product image URL is required' })}
                            placeholder="Product Image URL"
                        />
                        {errors.productImage && <span className={styles.Error}>{errors.productImage.message}</span>}
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            {...register('productDescription', { required: 'Description is required' })}
                            placeholder="Description"
                        ></textarea>
                        {errors.productDescription && <span className={styles.Error}>{errors.productDescription.message}</span>}
                    </div>
                    <div className={styles.ButtonContainer}>
                        <button onClick={onCancel} className={`${styles.Button} ${styles.DeleteBtn}`}>CANCEL</button>
                        <button type='submit' className={`${styles.Button} ${styles.EditBtn}`}>SAVE</button>
                    </div>
                    {/* <button type="submit" className={`${styles.Button} ${styles.EditBtn}`}>SAVE</button> */}
                </form>
            </div>
        );
    };

    if (isModalUpdate) {
        return (
            <div className={styles.ProductFormContainer}>
                <h2>Update Product</h2>
                <form onSubmit={handleSubmit(onSubmitUpdate)} className={styles.Form}>
                    <div className={styles.FormGroup}>
                        <label htmlFor="productName">Product Name</label>
                        <input
                            type="text"
                            {...register('productName', { required: 'Product name is required' })}
                            placeholder="Product Name"
                        />
                        {errors.productName && <span className={styles.Error}>{errors.productName.message}</span>}
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="productPrice">Product Price</label>
                        <input
                            type="number"
                            {...register('productPrice', { required: 'Product price is required', valueAsNumber: true })}
                            placeholder="Product Price"
                        />
                        {errors.productPrice && <span className={styles.Error}>{errors.productPrice.message}</span>}
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="productImage">Product Image URL</label>
                        <input
                            type="text"
                            {...register('productImage', { required: 'Product image URL is required' })}
                            placeholder="Product Image URL"
                        />
                        {errors.productImage && <span className={styles.Error}>{errors.productImage.message}</span>}
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            {...register('productDescription', { required: 'Description is required' })}
                            placeholder="Description"
                        ></textarea>
                        {errors.productDescription && <span className={styles.Error}>{errors.productDescription.message}</span>}
                    </div>
                    <div className={styles.ButtonContainer}>
                        <button onClick={onCancel} className={`${styles.Button} ${styles.DeleteBtn}`}>CANCEL</button>
                        <button type='submit' className={`${styles.Button} ${styles.EditBtn}`}>SAVE</button>
                    </div>
                    {/* <button type="submit" className={`${styles.Button} ${styles.EditBtn}`}>SAVE</button> */}
                </form>
            </div>
        );
    }

    if (isModalDelete) {
        return (
            <div className={styles.ProductFormContainer}>
                <div className={styles.FormGroup}>
                </div>
                <div className={styles.Form}>
                    <h2>Are you sure?</h2>
                    <div className={styles.ButtonContainer}>
                        <button onClick={onCancel} className={`${styles.Button} ${styles.DeleteBtn}`}>CANCEL</button>
                        <button onClick={onClickDelete} className={`${styles.Button} ${styles.EditBtn}`}>CONFIRM</button>
                    </div>
                </div>

            </div>
        );
    }

    return null;
};

export default ProductForm;
