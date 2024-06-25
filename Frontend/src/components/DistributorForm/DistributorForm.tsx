import { useForm } from "react-hook-form";
import styles from "./DistributorForm.module.scss";
import { addDistributor, fetchDistributor,updateDistributor,deleteDistributor } from "../../services/manufacturer.services.ts";
import { DistributorFormData, DistributorFormProps } from "./DistributorForm.types.ts"
import { useEffect } from "react";

const DistributorForm = ({ isModalAdd, isModalDelete, isModalUpdate, closeModal,distributorID,distributor,dispatch}: DistributorFormProps) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<DistributorFormData>();

    const onSubmit = async(data: DistributorFormData) => {
        data.role = 'Distributor'
        console.log(data);
        addDistributor(data);
        const updatedDistributors = await fetchDistributor();
        dispatch({ type: 'SET_DISTRIBUTORS', payload: updatedDistributors.data });
        closeModal()
        
    }

    useEffect(() => {
        if (distributor) {
            setValue('name', distributor.name);
            setValue('email', distributor.email);
            setValue('mobileNumber', distributor.mobileNumber);
            setValue('username', distributor.username);
        }
    }, [distributor, setValue]);

    const onSubmitUpdate = async(data: DistributorFormData) => {
        console.log(distributorID, data);
        if(!distributorID) throw "DistributorId undefined"
        await updateDistributor(distributorID,data);
        const updatedDistributors = await fetchDistributor();
        console.log(updatedDistributors);
        
        dispatch({ type: 'SET_DISTRIBUTORS', payload: updatedDistributors.data });
        closeModal()
    };
    const onCancel = () =>{
        closeModal()
    }
    
    const onClickDelete = async() => {
        console.log(distributorID, "delete");
        //api delete
        if(!distributorID) throw "productId undefined"
        await deleteDistributor(distributorID);
        const updatedDistributors = await fetchDistributor();
        dispatch({ type: 'SET_DISTRIBUTORS', payload: updatedDistributors.data });
        closeModal();
    };

    if (isModalAdd) {
        return (
            <div className={styles.ProductFormContainer}>
                <h2>Add New Distributor</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
                    <div className={styles.FormGroup}>
                        <label htmlFor="name">Distributor Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            placeholder="Distributor Name"
                        />
                        {errors.name && <span className={styles.Error}>{errors.name.message}</span>}
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            {...register('username', { required: 'Username is required' })}
                            placeholder="Username"
                        />
                        {errors.username && <span className={styles.Error}>{errors.username.message}</span>}
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            placeholder="Password"
                        />
                        {errors.password && <span className={styles.Error}>{errors.password.message}</span>}
                    </div>
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
                            {...register('mobileNumber', { required: 'Contsact number is required' })}
                            placeholder="Contact Details"
                        />
                        {errors.mobileNumber && <span className={styles.Error}>{errors.mobileNumber.message}</span>}
                    </div>
                    <div className={styles.ButtonContainer}>
                        <button onClick={onCancel} className={`${styles.Button} ${styles.DeleteBtn}`}>CANCEL</button>
                        <button onClick={onClickDelete} className={`${styles.Button} ${styles.EditBtn}`}>SAVE</button>
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
                        <label htmlFor="name"> Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Product name is required' })}
                            placeholder=" Name"
                        />
                        {errors.name && <span className={styles.Error}>{errors.name.message}</span>}
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="mobileNumber">Contact Details</label>
                        <input
                            type="text"
                            {...register('mobileNumber', { required: 'Contact Details is required' })}
                            placeholder="Contact Details"
                        />
                        {errors.mobileNumber && <span className={styles.Error}>{errors.mobileNumber.message}</span>}
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            {...register('email', { required: 'Email is required' })}
                            placeholder="Email"
                        />
                        {errors.email && <span className={styles.Error}>{errors.email.message}</span>}
                    </div>
                    
                    <div className={styles.FormGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            {...register('username', { required: 'Username  is required' })}
                            placeholder="Username"
                        />
                        {errors.username && <span className={styles.Error}>{errors.username.message}</span>}
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

}

export default DistributorForm 
