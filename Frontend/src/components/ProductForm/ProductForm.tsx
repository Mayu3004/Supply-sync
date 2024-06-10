
import { addProducts } from '../../services/manufacturerProducts.services';
import styles from './ProductForm.module.scss';
import { ProductFormProps, ProductFormData } from './ProductForm.types';
import { useForm } from 'react-hook-form';

const ProductForm = ({}: ProductFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>();

    const onSubmit = (data: ProductFormData) => {
        console.log(data);
        addProducts(data);
    };

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
                        {...register('productPrice', { required: 'Product price is required' })}
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
                        {...register('description', { required: 'Description is required' })}
                        placeholder="Description"
                    ></textarea>
                    {errors.description && <span className={styles.Error}>{errors.description.message}</span>}
                </div>
                <button type="submit" className={styles.SubmitButton}>SAVE</button>
            </form>
        </div>
    );
};

export default ProductForm;
