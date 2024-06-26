import { useEffect, useState } from "react";
import styles from "./Profile.module.scss"; 
import { ProfileData, ProfileProps } from "./Profile.types.ts" 
import { fetchUserData } from "../../services/DistributorProduct.services.ts";
 
const Profile = ({}: ProfileProps) => { 
    
    const [userData,setUserData] = useState<ProfileData>();

    useEffect(()=>{
        fetchUserDataHandler();
    },[])
    const fetchUserDataHandler = async()=>{
        try{
            const response = await fetchUserData();
            setUserData(response.data)
        }catch(error){
            
        }

    }

    return(
        <div className={styles.ProfileContainer}>
        {userData && (
            <div className={styles.ProfileDetails}>
                <h1>Name: {userData.name}</h1>
                <p>Mobile Number: {userData.mobileNumber}</p>
                <p>Email: {userData.email}</p>
                 <p>Points: {userData.totalPoints}</p>
                
            </div>
        )}
    </div>
);
    
} 
 
export default Profile 
