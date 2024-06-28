 import {z} from "zod";

 export const distributorFormSchema = z.object ({
  //  _id:z.string().optional(),
    name: z.string().min(1,{message:"Name is required"}),
    username:z.string().min(1,{message:"Username is required"}).optional(),
    password:z.string().min(1,{message:"password is required"}).optional(),
    role:z.enum(['Distributor']).optional(),
    mobileNumber:z.string().min(10,{message:"Mobile Number of 10 digits required"}).max(10,{message:"Mobile number is greater than 10 digit"}),
    email:z.string().min(1,{message:"Email is required"}),
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
