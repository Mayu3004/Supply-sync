import { Outlet } from "react-router-dom";
import styles from "./ParentRequests.module.scss"; 
import { ParentRequestsProps } from "./ParentRequests.types.ts" 
 
const ParentRequests = ({}: ParentRequestsProps) => { 
    return(
        <div>
            <Outlet/>
        </div>
    )
} 
 
export default ParentRequests 
