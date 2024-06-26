import Instance from "./instance.services";

export const fetchMerchandise = async (page:number) =>{
    try {
        const response = await Instance.get(`/merchandise/allmerchandise/${page}/6`);
        // console.log(response.data.data);
        
        return response.data.data;
    } catch (error) {
        console.error("Error fetching Merchandise:", error);
    }
}

export const deleteMerchandise = async (id:string) =>{
  try{
    const response = await Instance.delete(`/merchandise/delete/${id}`)
    return response.data
  }catch(error){
    console.error("Error Deleting Merchandise", error)
  }
}

export const approveMerchandise = async(data:any) =>{
  console.log(data);
  
  try{
    const response = await Instance.put(`/merchandise/approve`,data);
    return response.data;
  }catch(error){
   console.log("error upating order",error)
   throw error;
  }
}
