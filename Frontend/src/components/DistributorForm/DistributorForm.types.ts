 import {z} from "zod";

 export const distributorFormSchema = z.object ({
    name: z.string(),
    username:z.string(),
    password:z.string(),
    role:z.string().optional().default('Distributor'),
    mobileNumber:z.number(),
    email:z.string(),
    points:z.number().optional().default(0)
 })

 export interface DistributorFormData extends z.infer<typeof distributorFormSchema>{}
 
 export interface DistributorFormProps {
   isModalAdd?:boolean
    isModalUpdate?:boolean
    isModalDelete?:boolean
    productID?:string 
    closeModal?:()=>void 
 } 
