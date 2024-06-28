import { toast } from "react-toastify";
import Instance from "./instance.services";

export const fetchDistributorInventory = async () => {
    try {
      const response = await Instance.get("inventory/getinventory",);
     
      
      return response.data;
    } catch (error) {
      console.error("Error fetching productDetail:", error);
    }
  }
  
  export const submitOrder = async (orderData: any) => {
    const userId = JSON.parse(localStorage.getItem("userId") as string)
    const dataPost = {distributorId:userId,products:orderData}
    
    try {
        const response = await Instance.post('order/placeorder', dataPost);
        toast.success('Order Placed succesfully')
        return response.data; 
    } catch (error) {
        console.error('Error submitting order:', error);
        throw error; 
    }
};

export const fetchOrders = async (status:string,page:number) =>{
  
  try {
    const response = await Instance.get(`order/allorder/${status}/${page}/3`);
  
    return response.data
    
  } catch (error) {
    
  }
}

export const completeOrder = async (orderId:string) =>{
  try{ 
    const response = await Instance.put(`order/update/${orderId}`,{
      status:"completed"
    });
    return response.status
  }
  catch(error){
    toast.error(`${error}`)
  }
}

export const redeeemMerchandiseRequest = async(id:string) =>{
  const userId = JSON.parse(localStorage.getItem("userId") as string)
  const dataPost = {merchandiseId:id,userId:userId}
  try {
    const response = await Instance.post('merchandise/redeem', dataPost);
    return response.data; 
} catch (error:any) {
    console.error('Error submitting order:', error);
    throw error; 
}
}

export const fetchMerchandiseByStatus = async(status:string,page:number)=>{
  
  
  try {
    const response = await Instance.get(`merchandise/request/${status}/${page}/3`);
   
   
    return response.data
    
  } catch (error) {
    
  }
}

export const submitSale = async (allData: any) => {
  const userId = JSON.parse(localStorage.getItem("userId") as string)
  const dataPost = {...allData,distributorId:userId}
  try {
      const response = await Instance.post('sales/create-sales', dataPost);
      toast.success("Sales Added Successfully")
      return response.data; 
  } catch (error:any) {
      toast.error(`${error.response.data.error}`) 
  }
};

export const fetchUserData = async()=>{
  try{
    const response = await Instance.get(`user/profile`)
    return response.data;
  }catch (error) {
    console.error('Error getting order:', error);
    throw error; 
}
}