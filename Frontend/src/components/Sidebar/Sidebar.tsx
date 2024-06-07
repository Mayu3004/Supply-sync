import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss"; 
import { SidebarProps } from "./Sidebar.types.ts" 
 
const Sidebar = ({items}: SidebarProps) => { 

    return(
        <div className={styles.SidebarContainer}>
            {items.map((item, index) => (
                <Link key={index} to={item.path} className={styles.SidebarItem}>
                    {item.name}
                </Link>
            ))}
        </div>
    )
} 

export const Random = () =>{
    return(
        <div>Random</div>
    )
}
export default Sidebar 
