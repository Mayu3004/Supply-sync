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

export const fetchOrders = async (status:string) =>{
  try {
    const response = await Instance.get(`order/allorder/${status}`);
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

