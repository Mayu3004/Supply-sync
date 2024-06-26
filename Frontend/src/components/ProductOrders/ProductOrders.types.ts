export interface OrderProducts{
    productId:string;
    quantity:number;
    productName?: string;
    _id?:string
}

export interface Product {
    productId: string;
    name: string;
}

export interface Order {
    _id: string;
    distributorId: string;
    distributorName?: string;
    products: OrderProducts[];
    status: 'pending' | 'completed';
}

export interface Distributor {
    // distributorId: string;
    _id: string;
    name: string;
}
 
 export interface ProductOrdersProps {} 
