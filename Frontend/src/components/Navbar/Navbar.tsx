import styles from "./Navbar.module.scss";
import { NavbarProps } from "./Navbar.types.ts"
import profileImage from "../../assets/images/profile.png"
import { LogoutRequestHandler } from "../../services/login.services.ts";
import { useNavigate } from "react-router-dom";

const Navbar = ({ }: NavbarProps) => {
    const navigate = useNavigate()

    const handleLogout = async() => {
        console.log("Logout");
        const token1 = localStorage.getItem('token');
        console.log("hadleLogiut:",token1);
        
        const parsedToken = token1 ? JSON.parse(token1) : null;
        const responseData =  await LogoutRequestHandler(parsedToken);
        // localStorage.clear()
        localStorage.setItem("token",JSON.stringify(responseData))
        navigate("/")
        // console.log(parsedToken);



    }
    return (
        <div className={styles.NavbarContainer}>

            <h1>Welcome {"Mayur"}</h1>
            <div className={styles.LeftContainer}>
                <img src={profileImage} alt="Profile" className={styles.ProfileImage} />
                <button className={styles.LogoutBtn} onClick={handleLogout}>Logout</button>
            </div>

        </div>
    )
}

export default Navbar 
