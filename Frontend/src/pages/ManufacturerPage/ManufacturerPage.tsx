import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.tsx";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import { manufacturerSidebarItems } from "../../constants/Sidebar.constants.ts";
import styles from "./ManufacturerPage.module.scss"; 
import { ManufacturerPageProps } from "./ManufacturerPage.types.ts" 
 
const ManufacturerPage = ({}: ManufacturerPageProps) => { 
    return (
        <div className={styles.FieldStaffPageContainer}>

            <div className={styles.NavBar}>
                <Navbar/>
            </div>
            <div className={styles.FieldStaffMain}>
                <div className={styles.SideBar}>
                    <Sidebar items={manufacturerSidebarItems} />
                </div>
                <div className={styles.StaffContainer}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
} 
 
export default ManufacturerPage 
