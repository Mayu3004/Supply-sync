import { toast } from "react-toastify";
import { InventoryFormData } from "../components/InventoryForm/InventoryForm.types";
import { ProductFormData } from "../components/ProductForm/ProductForm.types";
import Instance from "./instance.services";




export const fetchProducts = async (currentPage:number) => {
  try {
    const response = await Instance.get(`product/allproducts/${currentPage}/6`);
    
    
    return response.data;
  } catch (error) {
    console.error("Error fetching productDetail:", error);
  }
}

export const fetchManufacturerInventory = async () => {
  try {
    const response = await Instance.get("inventory/getinventory");
   
   
    
    return response.data;
  } catch (error) {
    console.error("Error fetching Inventory:", error);
  }
}

export const addProducts = async (data: ProductFormData) => {
 

  try {
    const response = await Instance.post("product/add-product", data)
    return response.data;
  } catch (error) {
    console.error("Error sending productDetail:", error);
  }
}

export const updateProduct = async (productId: string | null, data: Partial<ProductFormData>) => {

  try {
    const response = await Instance.put(`/product/update/${productId}`,data);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

export const updateManufacturerInventory = async (productId: string | null, data: Partial<InventoryFormData>) => {
  const IData = {...data,productId:productId}
  try {
    const response = await Instance.put(`/inventory/update`,IData);
    return response.data;
  } catch (error) {
    console.error('Error updating innventory:', error);
  }
};
export const deleteProduct = async (productId: string | null) => {
  try {
    const response = await Instance.delete(`/product/delete/${productId}`)
    toast.success("Product deleted successfully")
    return response.data;
  } catch (error:any) {
    toast.error(`${error.response.data.message}`);
  }
};


