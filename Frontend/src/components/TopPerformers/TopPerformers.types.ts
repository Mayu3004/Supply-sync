 import {z} from 'zod'

export const DateSchema = z.object({
  startDate:z.string().min(1,{message:"please select date"}),
  endDate:z.string().min(1,{message:"please select date"})
})


export interface DateForm extends z.infer<typeof DateSchema>{}


  export interface PerformerData{
    totalSales:number;
    distributorId:string;
    distributorName:string
 }
 
 export interface TopPerformersProps {} 
