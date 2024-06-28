
import { addDistributor, updateDistributor, deleteDistributor } from "../../services/manufacturer.services.ts";
import styles from "./DistributorForm.module.scss";
import { DistributorFormData, DistributorFormProps, distributorFormSchema } from "./DistributorForm.types.ts";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDistributorContext } from "../Distributor/DistributorContext.tsx";

const DistributorForm = ({ isModalAdd, isModalDelete, isModalUpdate, closeModal, distributorID, distributor }: DistributorFormProps) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<DistributorFormData>({
        resolver: zodResolver(distributorFormSchema)
    });
    const { dispatch } = useDistributorContext();

    useEffect(() => {
        if (distributor) {
            setValue('name', distributor.name);
            setValue('email', distributor.email);
            setValue('mobileNumber', distributor.mobileNumber);
            setValue('username', distributor.username);
        }
    }, [distributor, setValue]);

    const onSubmit = async (data: DistributorFormData) => {
        try {
            data.role = 'Distributor';
            await addDistributor(data);
            dispatch({ type: 'SET_REFRESH_DISTRIBUTORS', payload: true });
            closeModal();
        } catch (error) {
            toast.error('Error adding distributor');
        }
    };

    const onSubmitUpdate = async (data: DistributorFormData) => {
        try {
            if (!distributorID) throw new Error("Distributor ID undefined");
            await updateDistributor(distributorID, data);
            dispatch({ type: 'SET_REFRESH_DISTRIBUTORS', payload: true });
            closeModal();
        } catch (error) {
            toast.error('Error updating distributor');
        }
    };

    const onClickDelete = async () => {
        try {
            if (!distributorID) throw new Error("Distributor ID undefined");
            await deleteDistributor(distributorID);
            dispatch({ type: 'SET_REFRESH_DISTRIBUTORS', payload: true });
            closeModal();
        } catch (error) {
            console.error(error)
        }
    };

    const onCancel = () => {
        closeModal();
    };

    const renderFormFields = () => (
        <>
            <div className={styles.FormGroup}>
                <label htmlFor="name">Distributor Name</label>
                <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Distributor Name"
                />
                {errors.name && <span className={styles.Error}>{errors.name.message}</span>}
            </div>
            {isModalAdd&&<div className={styles.FormGroup}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    {...register('username', { required: 'Username is required' })}
                    placeholder="Username"
                />
                {errors.username && <span className={styles.Error}>{errors.username.message}</span>}
            </div>}
            {isModalAdd&&<div className={styles.FormGroup}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    placeholder="Password"
                />
                {errors.password && <span className={styles.Error}>{errors.password.message}</span>}
            </div>}
            <div className={styles.FormGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    placeholder="Email"
                />
                {errors.email && <span className={styles.Error}>{errors.email.message}</span>}
            </div>
            <div className={styles.FormGroup}>
                <label htmlFor="mobileNumber">Contact Details</label>
                <input
                    type="text"
                    {...register('mobileNumber', { required: 'Contact number is required' })}
                    placeholder="Contact Details"
                />
                {errors.mobileNumber && <span className={styles.Error}>{errors.mobileNumber.message}</span>}
            </div>
        </>
    );

    return (
        <div className={styles.ProductFormContainer}>
            {isModalAdd && (
                <>
                    <h2>Add New Distributor</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
                        {renderFormFields()}
                        <div className={styles.ButtonContainer}>
                            <button type="button" onClick={onCancel} className={`${styles.Button} ${styles.DeleteBtn}`}>CANCEL</button>
                            <button type="submit" className={`${styles.Button} ${styles.EditBtn}`}>SAVE</button>
                        </div>
                    </form>
                </>
            )}
            {isModalUpdate && (
                <>
                    <h2>Update Distributor</h2>
                    <form onSubmit={handleSubmit(onSubmitUpdate)} className={styles.Form}>
                        {renderFormFields()}
                        <div className={styles.ButtonContainer}>
                            <button type="button" onClick={onCancel} className={`${styles.Button} ${styles.DeleteBtn}`}>CANCEL</button>
                            <button type="submit" className={`${styles.Button} ${styles.EditBtn}`}>SAVE</button>
                        </div>
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
                        </div>
                    </div>
                </>
            )}
            {/* <ToastContainer /> */}
        </div>
    );
};

export default DistributorForm;
