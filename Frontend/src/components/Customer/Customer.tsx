import { useEffect, useState } from "react";
import styles from "./Customer.module.scss";
import { CustomerData, CustomerProps } from "./Customer.types.ts"
import { fetchCustomer } from "../../services/manufacturer.services.ts";
import List from "../List/List.tsx";

const Customer = ({ }: CustomerProps) => {

    const [customer,setCustomer] = useState<CustomerData[]>()

    useEffect(()=>{
        const fetchCustomerHandler = async () => {
            const value = await fetchCustomer();
            console.log(value.data);

            setCustomer(value.data)
        };

        fetchCustomerHandler();
    },[])

    return (
        <div className={styles.DistributorContainer}>
            <div className={styles.DistributorDataContainer} >
                {customer?.map((customer, index) => (
                    <List
                        key={index}
                        name={customer.name}
                        contact={customer.mobileNumber}
                        email={customer.email}
                    />
                ))}
            </div>
        </div>
    )
}

export default Customer 
