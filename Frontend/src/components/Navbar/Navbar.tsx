import styles from "./Navbar.module.scss"; 
import { NavbarProps } from "./Navbar.types.ts" 
import profileImage from "../../assets/images/profile.png"
 
const Navbar = ({}: NavbarProps) => { 
    const handleLogout = () =>{
        console.log("Logout");
        
    }
    return(
        <div className={styles.NavbarContainer}>

            <h1>Welcome {"Mayur"}</h1>
            <div className={styles.LeftContainer}>
            <img src= {profileImage} alt="Profile" className={styles.ProfileImage} />
            <button className={styles.LogoutBtn} onClick={handleLogout}>Logout</button>
            </div>
            
        </div>
    )
} 
 
export default Navbar 
