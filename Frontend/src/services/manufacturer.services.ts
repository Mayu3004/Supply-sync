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
      const response = await Instance.post("users/create-user", data);
      return response.data;
    } catch (error) {
      console.error("Error sending Distributor Detail:", error);
    }
  }

  export const updateDistributor = async (distributorId: string | null, data: Partial<DistributorFormData>) => {

    try {  
      const response = await Instance.put(`/user/update/${distributorId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
 
  export const deleteDistributor = async (distributorId: string | null) => {
    try {
      const response = await Instance.delete(`/user/delete/${distributorId}`)
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
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
    console.error("Error fetching Distributor Detail:", error);
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
