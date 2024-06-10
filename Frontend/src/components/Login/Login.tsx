import { useForm } from "react-hook-form";
import styles from "./Login.module.scss"; 
import { LoginData, LoginProps } from "./Login.types.ts" 
import { LoginRequestHandler } from "../../services/login.services.ts";
// import { JwtPayload, jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = ({}: LoginProps) => { 
    const { register, handleSubmit,formState:{errors}} = useForm<LoginData>()
    const navigate = useNavigate()
    
    const onSubmit = async(data:LoginData) =>{
        console.log(data);
        const responseData =  await LoginRequestHandler(data);
        console.log(responseData);
        localStorage.setItem("token",JSON.stringify(responseData.token))
        localStorage.setItem("role",JSON.stringify(responseData.role))
        const userRole = JSON.parse(localStorage.getItem("role") || '""')
        if(userRole === "Manufacturer"){
            console.log(userRole);
            navigate("/manufacturer")
        }   
        
    }


    return (
        <div className={styles.LoginContainer}>
            <div className={styles.FormContainer}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}
                    className={styles.Form}>
                    <div className={styles.FormGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            {...register("username", { required: true })}
                            placeholder="Username"
                        />
                        {errors.username && <span className={styles.Error}>Username is required</span>}
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true, minLength: 6 })}
                            placeholder="Password"
                        />
                        {errors.password && errors.password.type === "required" && (
                            <span className={styles.Error}>Password is required</span>
                        )}
                        {errors.password && errors.password.type === "minLength" && (
                            <span className={styles.Error}>Password must be at least 6 characters</span>
                        )}
                    </div>
                    <button className={styles.LoginBtn}>Login</button>
                </form>
            </div>
        </div>
    );
} 
 
export default Login 



