import { Order } from "../ProductOrders/ProductOrders.types";

 export interface OrderCardProps {
    order: Order;
    onComplete: (orderId: string) => void;

 } 
