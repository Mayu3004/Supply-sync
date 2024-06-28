
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss"; 
import { SidebarProps } from "./Sidebar.types"; 

const Sidebar = ({ items }: SidebarProps) => {
    const location = useLocation();
    const [expanded, setExpanded] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(location.pathname);

    const handleExpand = (name: string) => {
        setExpanded(expanded === name ? null : name);
    };

    const handleItemClick = (path: string, hasSubItems: boolean) => {
        setSelectedItem(path);
        if (hasSubItems) {
            handleExpand(path);
        }
    };

    return (
        <div className={styles.SidebarContainer}>
            {items.map((item, index) => (
                <div key={index} className={styles.SidebarItemContainer}>
                    <Link 
                        to={item.path} 
                        className={`${styles.SidebarItem} ${selectedItem === item.path ? styles.SelectedItem : ''}`}
                        onClick={() => handleItemClick(item.path, !!item.subItems)}
                    >
                        {item.name}
                    </Link>
                    {item.subItems && expanded === item.path && (
                        <div className={styles.SubItemsContainer}>
                            {item.subItems.map((subItem, subIndex) => (
                                <Link 
                                    key={subIndex} 
                                    to={subItem.path} 
                                    className={`${styles.SubItem} ${selectedItem === subItem.path ? styles.SelectedItem : ''}`}
                                    onClick={() => handleItemClick(subItem.path, false)}
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
