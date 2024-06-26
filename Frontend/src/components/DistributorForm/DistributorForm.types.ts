 import {z} from "zod";

 export const distributorFormSchema = z.object ({
  //  _id:z.string().optional(),
    name: z.string(),
    username:z.string(),
    password:z.string(),
    role:z.enum(['Distributor']).optional(),
    mobileNumber:z.string(),
    email:z.string(),
    totalPoints:z.number().optional().default(0)
 })

 export interface DistributorFormData extends z.infer<typeof distributorFormSchema>{}
 
 export interface DistributorFormProps {
  distributor?:DistributorFormData | null
   isModalAdd?:boolean
    isModalUpdate?:boolean
    isModalDelete?:boolean
    distributorID?:string 
    closeModal?:()=>void 
 } 
