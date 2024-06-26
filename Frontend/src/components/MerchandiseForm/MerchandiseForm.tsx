import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MerchandiseData } from "../Merchandise/Merchandise.types.ts";
import styles from "./MerchandiseForm.module.scss"; 
import { MerchandiseFormProps } from "./MerchandiseForm.types.ts" 
 
const MerchandiseForm = ({closeModal, handleSubmit, merchandise }: MerchandiseFormProps) => { 

    const { register, handleSubmit: onSubmitHandler, setValue, formState: { errors } } = useForm<MerchandiseData>();

    useEffect(() => {
        if (merchandise) {
            setValue('merchandiseName', merchandise.merchandiseName);
            setValue('merchandiseDescription', merchandise.merchandiseDescription);
            setValue('pointsRequired', merchandise.pointsRequired);
            setValue('merchandiseImage', merchandise.merchandiseImage);
        }
    }, [merchandise, setValue]);

    const onSubmit = (data: MerchandiseData) => {
        handleSubmit(data);
    };

    const onCancel = () => {
        closeModal();
    };

    return (
        <div className={styles.MerchandiseFormContainer}>
            <h2>{merchandise ? 'Update Merchandise' : 'Add New Merchandise'}</h2>
            <form onSubmit={onSubmitHandler(onSubmit)} className={styles.Form}>
                <div className={styles.FormGroup}>
                    <label htmlFor="merchandiseName">Merchandise Name</label>
                    <input
                        type="text"
                        {...register('merchandiseName', { required: 'Merchandise name is required' })}
                        placeholder="Merchandise Name"
                    />
                    {errors.merchandiseName && <span className={styles.Error}>{errors.merchandiseName.message}</span>}
                </div>
                <div className={styles.FormGroup}>
                    <label htmlFor="merchandiseDescription">Merchandise Description</label>
                    <textarea
                        {...register('merchandiseDescription', { required: 'Merchandise description is required' })}
                        placeholder="Merchandise Description"
                    ></textarea>
                    {errors.merchandiseDescription && <span className={styles.Error}>{errors.merchandiseDescription.message}</span>}
                </div>
                <div className={styles.FormGroup}>
                    <label htmlFor="pointsRequired">Points Required</label>
                    <input
                        type="number"
                        {...register('pointsRequired', { required: 'Points required is required', valueAsNumber: true })}
                        placeholder="Points Required"
                    />
                    {errors.pointsRequired && <span className={styles.Error}>{errors.pointsRequired.message}</span>}
                </div>
                <div className={styles.FormGroup}>
                    <label htmlFor="merchandiseImage">Merchandise Image URL</label>
                    <input
                        type="text"
                        {...register('merchandiseImage', { required: 'Merchandise image URL is required' })}
                        placeholder="Merchandise Image URL"
                    />
                    {errors.merchandiseImage && <span className={styles.Error}>{errors.merchandiseImage.message}</span>}
                </div>
                <div className={styles.ButtonContainer}>
                    <button onClick={onCancel} className={`${styles.Button} ${styles.DeleteBtn}`}>CANCEL</button>
                    <button type='submit' className={`${styles.Button} ${styles.EditBtn}`}>{merchandise ? 'UPDATE' : 'ADD'}</button>
                </div>
            </form>
        </div>
    );
} 
 
export default MerchandiseForm 
