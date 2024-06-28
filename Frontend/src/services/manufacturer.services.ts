import { toast } from "react-toastify";
import { DistributorData } from "../components/Distributor/Distributor.types";
import { DistributorFormData } from "../components/DistributorForm/DistributorForm.types";
import Instance from "./instance.services";

export const fetchDistributor = async (page:number) =>{
    try {
        
        const response = await Instance.get(`user/distributors/${page}/6`);
       
         
        return response.data;
      } catch (error) {
        console.error("Error fetching Distributor Detail:", error);
      }
}
export const addDistributor = async (data: DistributorFormData) => {
   
    try {  
      const response = await Instance.post("user/create-user", data);
      toast.success("Distributor updated succesfully")
      return response.data;
    } catch (error:any) {
      toast.error(`${error.response.data.error.message}`);
      // console.error("Error sending Distributor Detail:", error);
    }
  }

  export const updateDistributor = async (distributorId: string | null, data: Partial<DistributorFormData>) => {
   
        const dataPost = {name:data.name,mobileNumber:data.mobileNumber,email:data.email,totalPoints:data.totalPoints}

    try {  
      const response = await Instance.put(`/user/update/${distributorId}`, dataPost);
      toast.success("Distributor updated succesfully")
      return response.data;
    } catch (error:any) {
      toast.error(`${error.response.data.error.message}`);
    }
  };
 
  export const deleteDistributor = async (distributorId: string | null) => {
    try {
      const response = await Instance.delete(`/user/delete/${distributorId}`)
      toast.success("Distributor Deleted sucessfully")
      return response.data;
    } catch (error:any) {
      toast.error(`${error.response.data.error.message}`);
    }
  };


  export const fetchCustomer = async () =>{
    try {
        
        const response = await Instance.get("customer/allcustomers");
       
         
        return response.data;
      } catch (error) {
        console.error("Error fetching Distributor Detail:", error);
      }
}

export const fetchPerformers = async (startDate:string,endDate:string) =>{
  try {
        
    const response = await Instance.get("sales/topperformers", {
      params: {
        startdate: startDate,
        enddate: endDate
      }
    });
  
     
    return response.data;
  } catch (error) {
    toast.error("Error fetching Distributor Detail:");
  }
}

export const fetchTopProducts = async (startDate:string,endDate:string)=>{
  try {
        
    const response = await Instance.get("sales/topselling", {
      params: {
        startdate: startDate,
        enddate: endDate
      }
    });
    
     
    return response.data;
  } catch (error) {
    console.error("Error fetching Distributor Detail:", error);
  }
}

export const fetchSales = async (startDate:string,endDate:string)=>{
  try {
        
    const response = await Instance.get("sales/salesperproduct", {
      params: {
        startdate: startDate,
        enddate: endDate
      }
    });
    
     
    return response.data;
  } catch (error) {
    console.error("Error fetching Sales Detail:", error);
  }
}
