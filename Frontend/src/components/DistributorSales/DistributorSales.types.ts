 
 export interface InventoryProduct {
    productId: string;
    productName: string;
  }
  
  export interface FormData {
    customerName: string;
    customerMobileNumber: string;
    customerEmail: string;
    products: {
      productId: string;
      productName: string;
      quantity: number;
      currentPrice: number;
    }[];
  }
 
 export interface DistributorSalesProps {} 
