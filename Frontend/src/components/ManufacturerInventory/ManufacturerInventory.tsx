import { useEffect, useReducer } from "react";
import Card from "../Card/Card.tsx";
import styles from "./ManufacturerInventory.module.scss";
import { ManufacturerInventoryProps } from "./ManufacturerInventory.types.ts"
import { fetchManufacturerInventory } from "../../services/manufacturerProducts.services.ts";
import { initialManufacturerInventoryState, manufacturerInventoryReducer } from "./ManufacturerInventory.state.ts";
import InventoryForm from "../InventoryForm/InventoryForm.tsx";
import { ManufacturerInventoryProvider, useManufacturerInventoryContext } from "./ManufacturerInventoryContext.tsx";

const ManufacturerInventory = ({ }: ManufacturerInventoryProps) => {

    // const [state,dispatch] = useReducer(manufacturerInventoryReducer,initialManufacturerInventoryState);
    const { state, dispatch } = useManufacturerInventoryContext();

    const onUpdate = (id:string) =>{
        
        
        dispatch({type:"SET_MODAL_UPDATE",payload:{isOpen:true,productId:id}})
    }

    const closeModal = () =>{
        dispatch ({type:"SET_MODAL_UPDATE",payload:{
            isOpen:false,productId:null
        }})
    }
    useEffect (()=>{
        fetchProductHandler();
    },[])
    const fetchProductHandler = async ()=>{
        const value = await fetchManufacturerInventory();
        dispatch({type:'SET_PRODUCTS',payload:value.data})
    };

    useEffect(() => {
        if (state.refreshProducts) {
            fetchProductHandler();
            dispatch({ type: 'SET_REFRESH_PRODUCTS', payload: false });
        }
    }, [state.refreshProducts]);

   
    
    return (
        <div className={styles.ManufacturerProductContainer}>
            
            <div className={styles.DataContainer}>
                {state.products.filter(product=> product.product !==null).map((product, index) => (
                    <Card
                        key={index}
                        title={product.product.productName}
                        description={product.product.productDescription}
                        // price={product.productPrice}
                        quantity={product.quantity}
                        photoUrl={product.product.productImage}
                        // onDelete={() => { onDelete(product._id) }}
                        onUpdate={() => { onUpdate(product.product._id) }}
                    />
                ))}
            </div>
            {state.isModalUpdate && (
                <div className={styles.ModalView}>
                <div className={styles.ModalContent}>
                    <button className={styles.CloseBtn} onClick={closeModal}>X</button>
                    <InventoryForm
                        isModalUpdate={state.isModalUpdate}
                        productID={state.selectedProductId}
                        closeModal={closeModal}
                    />
                </div>
            </div>
            )}
        </div>
    )
}

const ManufacturerInventoryWrapper = () => (
    <ManufacturerInventoryProvider>
        <ManufacturerInventory />
    </ManufacturerInventoryProvider>
);

export default ManufacturerInventoryWrapper;
