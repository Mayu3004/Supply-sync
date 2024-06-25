import { DistributorData } from "../components/Distributor/Distributor.types";
import { DistributorFormData } from "../components/DistributorForm/DistributorForm.types";
import Instance from "./instance.services";

export const fetchDistributor = async () =>{
    try {
        
        const response = await Instance.get("users/distributors");
        console.log(response.data);
         
        return response.data;
      } catch (error) {
        console.error("Error fetching Distributor Detail:", error);
      }
}
export const addDistributor = async (data: DistributorFormData) => {
    console.log(data);
  
    try {  
      const response = await Instance.post("users/create-user", data);
      return response.data;
    } catch (error) {
      console.error("Error sending Distributor Detail:", error);
    }
  }

  export const updateDistributor = async (distributorId: string | null, data: Partial<DistributorFormData>) => {

    try {  
      const response = await Instance.put(`/users/update/${distributorId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
 
  export const deleteDistributor = async (distributorId: string | null) => {
    try {
      const response = await Instance.delete(`/users/delete/${distributorId}`)
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  export const fetchCustomer = async () =>{
    try {
        
        const response = await Instance.get("customer/allcustomers");
        console.log(response.data);
         
        return response.data;
      } catch (error) {
        console.error("Error fetching Distributor Detail:", error);
      }
}


// export const fetchDistributor = () =>{
//     return  [
//         {
//             distributorId: "D001",
//             distributorName: "John Doe",
//             contactNumber: "123-456-7890",
//             salesGenerated: 150000
//         },
//         {
//             distributorId: "D002",
//             distributorName: "Jane Smith",
//             contactNumber: "098-765-4321",
//             salesGenerated: 200000
//         },
//         {
//             distributorId: "D003",
//             distributorName: "Michael Johnson",
//             contactNumber: "555-123-4567",
//             salesGenerated: 180000
//         },
//         {
//             distributorId: "D004",
//             distributorName: "Emily Davis",
//             contactNumber: "555-765-4321",
//             salesGenerated: 220000
//         },
//         {
//             distributorId: "D005",
//             distributorName: "William Brown",
//             contactNumber: "555-987-6543",
//             salesGenerated: 170000
//         },
//         {
//             distributorId: "D006",
//             distributorName: "Olivia Wilson",
//             contactNumber: "555-654-3210",
//             salesGenerated: 210000
//         },
//         {
//             distributorId: "D007",
//             distributorName: "James Taylor",
//             contactNumber: "555-432-1098",
//             salesGenerated: 160000
//         },
//         {
//             distributorId: "D008",
//             distributorName: "Sophia Anderson",
//             contactNumber: "555-210-9876",
//             salesGenerated: 190000
//         },
//         {
//             distributorId: "D009",
//             distributorName: "Lucas Thomas",
//             contactNumber: "555-876-5432",
//             salesGenerated: 175000
//         },
//         {
//             distributorId: "D010",
//             distributorName: "Mia Martinez",
//             contactNumber: "555-321-0987",
//             salesGenerated: 230000
//         }
//     ];
    
    
// }