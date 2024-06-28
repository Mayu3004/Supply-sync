 
 export interface InventoryProduct {
    productId: string;
    productName: string;
  }
  
  export interface FormData {
    customerName: string;
    customerMobileNumber: string;
    customerEmail: string;
    products: {
      productId: string;
      productName: string;
      quantity: number;
      currentPrice: number;
    }[];
  }
  import { z } from 'zod';

  export const distributorSalesSchema = z.object({
    customerName: z.string().trim().min(1, { message: "Customer name is required" }),
    customerMobileNumber: z.string().trim().min(1, { message: "Customer mobile number is required" }),
    customerEmail: z.string().email({ message: "Invalid email address" }),
    products: z.array(
      z.object({
        productId: z.string(),
        productName: z.string(),
        quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
        currentPrice: z.number().min(0, { message: "Price must be at least 0" }),
      })
    ),
  });
  
  export type DistributorSalesFormData = z.infer<typeof distributorSalesSchema>;
  
 export interface DistributorSalesProps {} 
