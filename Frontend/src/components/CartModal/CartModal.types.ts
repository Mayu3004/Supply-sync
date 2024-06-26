import { CartItem } from "../DistributorProduct/DistributorProduct.state";

 export interface CartModalProps {
    cartItems: CartItem[];
    onClose: () => void;
    onConfirm: (updatedCart: CartItem[]) => void;
 } 
