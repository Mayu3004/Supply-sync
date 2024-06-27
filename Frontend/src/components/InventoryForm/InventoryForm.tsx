import { useForm } from "react-hook-form";
import styles from "./InventoryForm.module.scss";
import { InventoryFormData, InventoryFormProps, inventoryFormSchema } from "./InventoryForm.types.ts"
import { fetchManufacturerInventory, updateManufacturerInventory } from "../../services/manufacturerProducts.services.ts";
import { useManufacturerInventoryContext } from "../ManufacturerInventory/ManufacturerInventoryContext.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const InventoryForm = ({ isModalUpdate, closeModal, productID }: InventoryFormProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<InventoryFormData>({
        resolver: zodResolver(inventoryFormSchema)
    });
    const { dispatch } = useManufacturerInventoryContext();

    const onSubmitUpdate = async (data: InventoryFormData) => {
        try {
            if (!productID) throw new Error("ProductID indefined")
            await updateManufacturerInventory(productID, data);
            toast.success('Product updated successfully');
            dispatch({ type: 'SET_REFRESH_PRODUCTS', payload: true });
            closeModal()
        } catch (error) {
            toast.error('Error updating product');
        }


    }
    const onCancel = () => {
        closeModal()
    }
    if (isModalUpdate) {
        return (
            <div className={styles.ProductFormContainer}>
                <h2>Update Product</h2>
                <form onSubmit={handleSubmit(onSubmitUpdate)} className={styles.Form}>
                    <div className={styles.FormGroup}>
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            {...register('quantity', { required: 'Quantity is required', valueAsNumber: true })}
                            placeholder="Quantity"
                        />
                        {errors.quantity && <span className={styles.Error}>{errors.quantity.message}</span>}
                    </div>
                    <div className={styles.ButtonContainer}>
                        <button onClick={onCancel} className={`${styles.Button} ${styles.DeleteBtn}`}>CANCEL</button>
                        <button type='submit' className={`${styles.Button} ${styles.EditBtn}`}>SAVE</button>
                    </div>
                </form>
            </div>
        )
    }

}

export default InventoryForm 
