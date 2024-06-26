import { Outlet } from "react-router-dom";
import styles from "./ParentManufacturerRequests.module.scss"; 
import { ParentManufacturerRequestsProps } from "./ParentManufacturerRequests.types.ts" 
 
const ParentManufacturerRequests = ({}: ParentManufacturerRequestsProps) => { 
    return(
        <div>
            <Outlet/>
        </div>
    )
} 
 
export default ParentManufacturerRequests 
