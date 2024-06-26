import Instance from "./instance.services";

export const fetchDistributorInventory = async () => {
    try {
      const response = await Instance.get("inventory/getinventory",);
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching productDetail:", error);
    }
  }
  
  export const submitOrder = async (orderData: any) => {
    const userId = JSON.parse(localStorage.getItem("userId") as string)
    const dataPost = {distributorId:userId,products:orderData}
    console.log(dataPost);
    
    try {
        const response = await Instance.post('order/placeorder', dataPost);
        return response.data; 
    } catch (error) {
        console.error('Error submitting order:', error);
        throw error; 
    }
};

export const fetchOrders = async (status:string,page:number) =>{
  // console.log("status--->",status)
  try {
    const response = await Instance.get(`order/allorder/${status}/${page}/3`);
    console.log(response.data);
    return response.data
    
  } catch (error) {
    
  }
}

export const completeOrder = async (orderId:string) =>{
  try{
    console.log("hit");
    
    const response = await Instance.put(`order/update/${orderId}`,{
      status:"completed"
    });
    return response.status
  }
  catch(error){

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
    console.log(response.data);
    return response.data
    
  } catch (error) {
    
  }
}

export const submitSale = async (allData: any) => {
  const userId = JSON.parse(localStorage.getItem("userId") as string)
  const dataPost = {...allData,distributorId:userId}
  console.log(dataPost);
  
  try {
      const response = await Instance.post('sales/create-sales', dataPost);
      return response.data; 
  } catch (error) {
      console.error('Error submitting order:', error);
      throw error; 
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