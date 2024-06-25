import { Product } from "../ManufacturerProduct/ManufacturerProduct.types";

 
// export interface InventoryProduct {
//     _id:string,
//     product:Product,
//     quantity?:number
// }
 // ManufacturerInventory.types.ts

export interface IProduct {
    _id: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productImage: string;
    productQuantity?:number | undefined
}

export interface InventoryProduct {
    product: Product;
    quantity: number;
}

 export interface ManufacturerInventoryProps {} 
