 import {z} from "zod";

 export const distributorFormSchema = z.object ({
  //  _id:z.string().optional(),
    name: z.string().nonempty("Name is required"),
    username:z.string().nonempty("Username is required"),
    password:z.string().nonempty("password is required"),
    role:z.enum(['Distributor']).optional(),
    mobileNumber:z.string().nonempty("Mobile NUmber is required"),
    email:z.string().nonempty("Email is required"),
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
