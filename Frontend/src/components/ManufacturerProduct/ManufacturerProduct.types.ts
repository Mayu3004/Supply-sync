export interface Product {
   _id:string
   productName: string;
   productDescription: string;
   productPrice: number;
   productQuantity?: number | undefined;
   productImage: string;
}

export interface ManufacturerProductProps {
   // products: Product[];
   //   onUpdate: () => void;
   //   onDelete: () => void;
} 
