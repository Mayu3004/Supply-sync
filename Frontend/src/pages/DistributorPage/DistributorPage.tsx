import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.tsx";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import { distributorSidebarItems } from "../../constants/Sidebar.constants.ts";
import styles from "./DistributorPage.module.scss"; 
import { DistributorPageProps } from "./DistributorPage.types.ts" 
 
const DistributorPage = ({}: DistributorPageProps) => { 
    return (
        <div className={styles.FieldStaffPageContainer}>

            <div className={styles.NavBar}>
                <Navbar/>
            </div>
            <div className={styles.FieldStaffMain}>
                <div className={styles.SideBar}>
                    <Sidebar items={distributorSidebarItems} />
                </div>
                <div className={styles.StaffContainer}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
} 

 
export default DistributorPage 
