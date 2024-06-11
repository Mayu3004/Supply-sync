import { ProductFormData } from "../components/ProductForm/ProductForm.types";
import Instance from "./instance.services";




export const fetchProducts = async () =>{
  try {
    const token = localStorage.getItem('token');
    const parsedToken = token ? JSON.parse(token) : null;
    console.log(parsedToken);

    const response = await Instance.get("product/allproducts",  {
      headers: {
        Authorization: `Bearer ${parsedToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching productDetail:", error);
  }
}

export const addProducts = async (data: ProductFormData) => {
  console.log(data);

  try {
    const token = localStorage.getItem('token');
    const parsedToken = token ? JSON.parse(token) : null;
    console.log(parsedToken);

    const response = await Instance.post("product/add-product", data, {
      headers: {
        Authorization: `Bearer ${parsedToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error sending productDetail:", error);
  }
}

export const updateProduct = async (productId: string | null, data: Partial<ProductFormData>) => {
  const token = localStorage.getItem('token');
  try {
    const response = await Instance.put(`/product/update/${productId}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

export const deleteProduct = async (productId: string | null) => {
  const token = localStorage.getItem('token');
  try {
    const response = await Instance.delete(`/product/delete/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};


// export const fetchProducts = () => {
//   return [
//     {
//       id: "123",
//       productName: "Industrial Grade Steel Bolts",
//       productDescription: "High-quality steel bolts for industrial applications.",
//       productPrice: 5.99,
//       quantity: 500,
//       productImage: "https://imgs.search.brave.com/f4BdZzOBp8wtFvrKN_5vQvm8jt1YK4BfoasDFzoWdWM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9z/dGVlbC1waXBlcy1w/dXQtdG9nZXRoZXJf/MTExMi05MDMuanBn/P3NpemU9NjI2JmV4/dD1qcGc",
//     },
//     {
//       id: "12345",
//       productName: "Automated Assembly Line Robot",
//       productDescription: "Advanced robot for automating assembly line processes.",
//       price: 29999.99,
//       quantity: 10,
//       photoUrl: "https://imgs.search.brave.com/f4BdZzOBp8wtFvrKN_5vQvm8jt1YK4BfoasDFzoWdWM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9z/dGVlbC1waXBlcy1w/dXQtdG9nZXRoZXJf/MTExMi05MDMuanBn/P3NpemU9NjI2JmV4/dD1qcGc",
//     },
//     {
//       id: "1234567",
//       productName: "Heavy Duty Conveyor Belt",
//       productDescription: "Durable conveyor belt for heavy-duty material handling.",
//       price: 499.99,
//       quantity: 25,
//       photoUrl: "https://imgs.search.brave.com/rfANEq-GcWZzKttX55_s4eaKfBxA-_rtTDFFE1hJTGE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/MDI3MjU0MS9waG90/by9kaXN0cmlidXRp/b24td2FyZWhvdXNl/LXdpdGgtZ2FsdmFu/aXplZC1zdGVlbC1y/b2xscy53ZWJwP2I9/MSZzPTE3MDY2N2Em/dz0wJms9MjAmYz01/T2pLZUJRcDF4YjRp/d0xUU09mYkVhektD/amd1VGNZOTlucWpR/VjYyQURvPQ",
//     },
//     {
//       id: "123456789",
//       productName: "Precision Machined Gears",
//       productDescription: "High-precision gears for machinery and automotive applications.",
//       price: 19.99,
//       quantity: 100,
//       photoUrl: "https://imgs.search.brave.com/rfANEq-GcWZzKttX55_s4eaKfBxA-_rtTDFFE1hJTGE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/MDI3MjU0MS9waG90/by9kaXN0cmlidXRp/b24td2FyZWhvdXNl/LXdpdGgtZ2FsdmFu/aXplZC1zdGVlbC1y/b2xscy53ZWJwP2I9/MSZzPTE3MDY2N2Em/dz0wJms9MjAmYz01/T2pLZUJRcDF4YjRp/d0xUU09mYkVhektD/amd1VGNZOTlucWpR/VjYyQURvPQ",
//     },
//     {
//       id: "12345678901",
//       productName: "Industrial Welding Robot",
//       productDescription: "Robotic welding system for industrial manufacturing.",
//       price: 34999.99,
//       quantity: 5,
//       photoUrl: "https://imgs.search.brave.com/HWxDi2XcJXMEjzZyVSHg0HgcUUaaPmacVxulsGqpe5A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9s/YXJnZS1zdGVlbC1m/YWN0b3J5LXdhcmVo/b3VzZV8xMTI3LTMy/ODUuanBnP3NpemU9/NjI2JmV4dD1qcGc",
//     },
//     {
//       id: "1234567890123",
//       productNaproductNe: "Heavy Duty Hydraulic Press",
//       productDescription: "Powerful hydraulic press for metalworking and fabrication.",
//       price: 9999.99,
//       quantity: 8,
//       photoUrl: "https://imgs.search.brave.com/HWxDi2XcJXMEjzZyVSHg0HgcUUaaPmacVxulsGqpe5A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9s/YXJnZS1zdGVlbC1m/YWN0b3J5LXdhcmVo/b3VzZV8xMTI3LTMy/ODUuanBnP3NpemU9/NjI2JmV4dD1qcGc",
//     },
//     {
//       id: "123456789012345",
//       productName: "Automotive Paint Booth",
//       productDescription: "Enclosed booth for automotive painting and finishing.",
//       price: 15999.99,
//       quantity: 3,
//       photoUrl: "https://imgs.search.brave.com/si-yQT5bYzM3Z9n0QtY4fstYHegQAvDghQemSSsl9hE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzExLzc1/LzQ3LzExNzU0N2Y5/MGY4YTVmZjFmN2Qy/YWJlNTJiZWM3ZTJl/LmpwZw",
//     },
//     {
//       id: "12345678901234567",
//       productName: "Industrial Grade Drill Press",
//       productDescription: "Versatile drill press for precision drilling in industrial settings.",
//       price: 2499.99,
//       quantity: 15,
//       photoUrl: "https://imgs.search.brave.com/si-yQT5bYzM3Z9n0QtY4fstYHegQAvDghQemSSsl9hE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzExLzc1/LzQ3LzExNzU0N2Y5/MGY4YTVmZjFmN2Qy/YWJlNTJiZWM3ZTJl/LmpwZw",
//     },
//     {
//       id: "1234567890123456789",
//       productName: "Heavy Duty Industrial Fan",
//       productDescription: "High-performance fan for industrial ventilation and cooling.",
//       price: 799.99,
//       quantity: 20,
//       photoUrl: "https://imgs.search.brave.com/si-yQT5bYzM3Z9n0QtY4fstYHegQAvDghQemSSsl9hE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzExLzc1/LzQ3LzExNzU0N2Y5/MGY4YTVmZjFmN2Qy/YWJlNTJiZWM3ZTJl/LmpwZw",
//     },
//     {
//       id: "123456789012345678901",
//       productName: "Advanced CNC Milling Machine",
//       productDescription: "State-of-the-art CNC milling machine for precision machining tasks.",
//       price: 54999.99,
//       quantity: 6,
//       photoUrl: "https://imgs.search.brave.com/sBZWFJPzZZSP1S86NbXlhfBmNyET9hPbQor280Yihjo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9z/dGVlbC1iYXJzLXdl/bGRlZC10b2dldGhl/ci1pbmR1c3RyaWFs/LXNldHRpbmdfMTU3/MDI3LTQwODAuanBn/P3NpemU9NjI2JmV4/dD1qcGc",
//     },
//   ];
// }