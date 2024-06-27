
import { z } from "zod"

// export const productFormSchema = z.object({
//   productName: z.string().trim().optional(),
//   productPrice: z.number().optional(),
//   productImage: z.string().optional(),
//   productDescription: z.string().optional(),
//   productQuantity: z.number().optional()
// })

export const productFormSchema = z.object({
  productName: z.string().trim().nonempty("Product name is required"),
  productPrice: z.number().min(1),
  productImage: z.string().nonempty("Product image URL is required"),
  productDescription: z.string().nonempty("Description is required"),
  
});

export interface ProductFormData extends z.infer<typeof productFormSchema> { }

//  export interface ProductFormData {
//     productName?: string;
//     productPrice?: number;
//     productImage?: string;
//     productDescription?: string;
//     quantity?:number;
// }
export interface ProductFormProps {
  product?: ProductFormData | null
  isModalAdd?: boolean
  isModalUpdate?: boolean
  isModalDelete?: boolean
  productID?: string | null;
  closeModal?: () => void
} 
