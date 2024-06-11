import Instance from "./instance.services";

// export const fetchDistributor = async () =>{
//     try {
//         const response = await Instance.get("api for distributor");
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching Distributor:", error);
//     }
// }

export const fetchDistributor = () =>{
    return  [
        {
            distributorId: "D001",
            distributorName: "John Doe",
            contactNumber: "123-456-7890",
            salesGenerated: 150000
        },
        {
            distributorId: "D002",
            distributorName: "Jane Smith",
            contactNumber: "098-765-4321",
            salesGenerated: 200000
        },
        {
            distributorId: "D003",
            distributorName: "Michael Johnson",
            contactNumber: "555-123-4567",
            salesGenerated: 180000
        },
        {
            distributorId: "D004",
            distributorName: "Emily Davis",
            contactNumber: "555-765-4321",
            salesGenerated: 220000
        },
        {
            distributorId: "D005",
            distributorName: "William Brown",
            contactNumber: "555-987-6543",
            salesGenerated: 170000
        },
        {
            distributorId: "D006",
            distributorName: "Olivia Wilson",
            contactNumber: "555-654-3210",
            salesGenerated: 210000
        },
        {
            distributorId: "D007",
            distributorName: "James Taylor",
            contactNumber: "555-432-1098",
            salesGenerated: 160000
        },
        {
            distributorId: "D008",
            distributorName: "Sophia Anderson",
            contactNumber: "555-210-9876",
            salesGenerated: 190000
        },
        {
            distributorId: "D009",
            distributorName: "Lucas Thomas",
            contactNumber: "555-876-5432",
            salesGenerated: 175000
        },
        {
            distributorId: "D010",
            distributorName: "Mia Martinez",
            contactNumber: "555-321-0987",
            salesGenerated: 230000
        }
    ];
    
    
}