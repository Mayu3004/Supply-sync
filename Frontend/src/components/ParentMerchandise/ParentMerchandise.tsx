import { Outlet } from "react-router-dom";
import styles from "./ParentMerchandise.module.scss"; 
import { ParentMerchandiseProps } from "./ParentMerchandise.types.ts" 
 
const ParentMerchandise = ({}: ParentMerchandiseProps) => { 
    return(
        <div>
            <Outlet/>
        </div>
    )
} 
 
export default ParentMerchandise 
