
import { z } from "zod"

export const productFormSchema = z.object({
  productName: z.string().optional(),
  productPrice: z.number().optional(),
  productImage: z.string().optional(),
  productDescription: z.string().optional(),
  productQuantity: z.number().optional()
})

export interface ProductFormData extends z.infer<typeof productFormSchema> { }

//  export interface ProductFormData {
//     productName?: string;
//     productPrice?: number;
//     productImage?: string;
//     productDescription?: string;
//     quantity?:number;
// }
export interface ProductFormProps {
  product?: ProductFormData
  isModalAdd?: boolean
  isModalUpdate?: boolean
  isModalDelete?: boolean
  productID?: string
  closeModal?: () => void
} 
