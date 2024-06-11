import { useEffect, useState } from "react";
import styles from "./Distributor.module.scss";
import { DistributorData, DistributorProps } from "./Distributor.types.ts"
import { fetchDistributor } from "../../services/manufacturer.services.ts";
import List from "../List/List.tsx";
import DistributorForm from "../DistributorForm/DistributorForm.tsx";

const Distributor = ({ }: DistributorProps) => {
    const [distributors, setDistributors] = useState<DistributorData[]>();
    const [isModalAdd,setIsModalAdd] = useState<boolean>(false);
    const [isModalUpdate,setIsModalUpdate] = useState<boolean>(false);
    const [isModalDelete,setIsModalDelete] = useState<boolean>(false);

    
    const onUpdate = () =>{
        console.log("distributor update");
        setIsModalUpdate(true)
        
    }

    const onDelete = () =>{
        console.log("distributor deleted");
        setIsModalDelete(true)
        
    }

    const handleClick = () =>{
        setIsModalAdd(true)
    }
    const closeModal = () =>{
        setIsModalAdd(false);
        setIsModalUpdate(false);
        setIsModalDelete(false);
    }
    useEffect(() => {

        const fetchDistributorHandler = async () => {
            const value = await fetchDistributor();
            setDistributors(value)
        }

        fetchDistributorHandler()

    }, [])

    return (
        <div className={styles.DistributorContainer}>
            <button 
                className={styles.AddBtn}
                onClick={handleClick}
            > <strong>+</strong> ADD
            </button>
            <div className={styles.DistributorDataContainer} >
                {distributors?.map((distributor, index) => (
                    <List
                        key={index}
                        name={distributor.distributorName}
                        contact = {distributor.contactNumber}
                        sales = {distributor.salesGenerated}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>
            {isModalAdd && (
                <div className={styles.ModalView}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                        <DistributorForm isModalAdd={isModalAdd} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Distributor 
