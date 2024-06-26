import { Product } from "../ManufacturerProduct/ManufacturerProduct.types";
import { InventoryProduct } from "./ManufacturerInventory.types";


export interface ManufacturerInventoryState {
    isModalUpdate: boolean;
    selectedProductId: string | null;
    // selectedProduct: Product | null;
    products: InventoryProduct[];
}

export type ManufacturerInventoryAction = | {type: 'SET_PRODUCTS';payload:InventoryProduct[]}
| { type: 'SET_MODAL_UPDATE'; payload: { isOpen: boolean, productId: string | null } }

export const initialManufacturerInventoryState:ManufacturerInventoryState = {
    isModalUpdate:false,
    selectedProductId:null,
    products:[]
}


export const manufacturerInventoryReducer = (state:ManufacturerInventoryState,action:ManufacturerInventoryAction):ManufacturerInventoryState =>{
    switch(action.type){
        case 'SET_MODAL_UPDATE':
            return{...state,isModalUpdate:action.payload.isOpen,selectedProductId:action.payload.productId}
        case 'SET_PRODUCTS':
            return {...state,products:action.payload};
        default:
            return state
    }
}