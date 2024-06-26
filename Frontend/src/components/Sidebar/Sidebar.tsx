
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss"; 
import { SidebarProps } from "./Sidebar.types"; 

const Sidebar = ({ items }: SidebarProps) => {
    const [expanded, setExpanded] = useState<string | null>(null);

    const handleExpand = (name: string) => {
        setExpanded(expanded === name ? null : name);
    };

    return (
        <div className={styles.SidebarContainer}>
            {items.map((item, index) => (
                <div key={index} className={styles.SidebarItemContainer}>
                    <Link 
                        to={item.path} 
                        className={styles.SidebarItem} 
                        onClick={() => item.subItems && handleExpand(item.name)}
                    >
                        {item.name}
                    </Link>
                    {item.subItems && expanded === item.name && (
                        <div className={styles.SubItemsContainer}>
                            {item.subItems.map((subItem, subIndex) => (
                                <Link 
                                    key={subIndex} 
                                    to={subItem.path} 
                                    className={styles.SubItem}
                                >
                                    {subItem.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;

export const Random = () =>{
    return(
        <div>Random</div>
    )
}