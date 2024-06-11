import { useForm } from "react-hook-form";
import styles from "./DistributorForm.module.scss"; 
import { DistributorFormData, DistributorFormProps } from "./DistributorForm.types.ts" 
 
const DistributorForm = ({isModalAdd,isModalDelete,isModalUpdate,closeModal}: DistributorFormProps) => { 
    const { register, handleSubmit, formState: { errors } } = useForm<DistributorFormData>();

    const onSubmit = (data:DistributorFormData) =>{
        console.log(data);
        
    }

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
                            type="number"
                            {...register('mobileNumber', { required: 'Email is required',valueAsNumber:true })}
                            placeholder="Contact Details"
                        />
                        {errors.mobileNumber && <span className={styles.Error}>{errors.mobileNumber.message}</span>}
                    </div>
                    <button type="submit" className={styles.SubmitButton}>SAVE</button>
                </form>
            </div>
        );
    };
} 
 
export default DistributorForm 
