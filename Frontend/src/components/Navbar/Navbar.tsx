import styles from "./Navbar.module.scss";
import { NavbarProps } from "./Navbar.types.ts"
import profileImage from "../../assets/images/profile.png"
import { LogoutRequestHandler } from "../../services/login.services.ts";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../services/DistributorProduct.services.ts";
import { useEffect, useState } from "react";

const Navbar = ({ }: NavbarProps) => {
    const [name,setName] = useState<string>('')
    const navigate = useNavigate()
    const fetchUserDataHandler = async()=>{
        try{
            const response = await fetchUserData();
            
            
            setName(response.data.name)
            
        }catch(error){
            
        }

    }
    useEffect(()=>{
        fetchUserDataHandler
    },[])

    const handleLogout = async() => {
        
        const token1 = localStorage.getItem('token');
        
        
        const parsedToken = token1 ? JSON.parse(token1) : null;
        const responseData =  await LogoutRequestHandler(parsedToken);
        // localStorage.clear()
        localStorage.setItem("token",JSON.stringify(responseData))
        navigate("/")
      

    }
    return (
        <div className={styles.NavbarContainer}>

            <h1>Welcome {name}</h1>
            <div className={styles.LeftContainer}>
                <img src={profileImage} alt="Profile" className={styles.ProfileImage} />
                <button className={styles.LogoutBtn} onClick={handleLogout}>Logout</button>
            </div>

        </div>
    )
}

export default Navbar 
