import styles from "./LoginPage.module.scss";
import { LoginPageProps } from "./LoginPage.types.ts"
import LogoImage from "../../assets/images/logo.png"
import Login from "../../components/Login/Login.tsx";

const LoginPage = ({ }: LoginPageProps) => {
    return (
        <div className={styles.LoginPageContainer}>
            {/* <div className={styles.LoginPageHeader}>
                <h1>Welcome to Supply Management</h1>
            </div> */}

            <div className={styles.LeftContainer}>
                <img className={styles.LogoImage} src={LogoImage} alt="Logo" />
            </div>
            <div className={styles.RightContainer}>
                <div className={styles.RightHeader}>
                    <h1>Welcome to Supply Chain Management</h1>
                </div>
                <div className={styles.LoginContent}>
                    <Login />
                </div>
            </div>
        </div>
    )
}

export default LoginPage 
