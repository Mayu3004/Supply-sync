 import {z} from "zod"

 export const inventoryFormSchema = z.object({
    quantity:z.number().min(1)
 })

 export interface InventoryFormData extends z.infer<typeof inventoryFormSchema>{}
 
 export interface InventoryFormProps {
    isModalUpdate?:boolean
    productID?:string | null
    closeModal?:()=>void


 } 
