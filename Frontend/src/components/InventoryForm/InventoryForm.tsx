import { useForm } from "react-hook-form";
import styles from "./InventoryForm.module.scss";
import { InventoryFormData, InventoryFormProps } from "./InventoryForm.types.ts"
import { fetchManufacturerInventory, updateManufacturerInventory } from "../../services/manufacturerProducts.services.ts";

const InventoryForm = ({ isModalUpdate, closeModal, productID }: InventoryFormProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<InventoryFormData>();

    const onSubmitUpdate = async (data: InventoryFormData) => {
        if (!productID) throw "ProductID indefined"
        await updateManufacturerInventory(productID, data);
        closeModal()
        
    }
    const onCancel = () => {
        closeModal()
    }
    if(isModalUpdate){
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
