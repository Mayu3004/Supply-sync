

import React, { useState, useEffect, useReducer } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './DistributorSales.module.scss';
import { FormData } from './DistributorSales.types';
import { fetchDistributorInventory, submitSale } from '../../services/DistributorProduct.services';
// import { InventoryProduct } from '../ManufacturerInventory/ManufacturerInventory.types';
// import { Product } from '../ManufacturerProduct/ManufacturerProduct.types';

import { Product } from "../ManufacturerProduct/ManufacturerProduct.types";
import { InventoryProduct } from "./DistributorSales.types";
import { salesReducer, initialState } from './DistributorSales.state';

const DistributorSales= () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [inventory, setInventory] = useState<InventoryProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<InventoryProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<FormData['products']>([]);

  useEffect(() => {
    fetchInventory(); 
  }, []);

  const fetchInventory = async () => {
    const value = await fetchDistributorInventory();
    setInventory(value.data);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    const results = inventory.filter((item) =>
      item.product.productName.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };
  console.log(searchResults);
  

  const handleAddProduct = (product: Product) => {
    const { _id, productName } = product;
    const existingProduct = selectedProducts.find((p) => p.productId === _id);
    if (existingProduct) {
      setSelectedProducts(prevProducts =>
        prevProducts.map(p =>
          p.productId === _id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setSelectedProducts(prevProducts => [
        ...prevProducts,
        { productId: _id, productName, quantity: 1, currentPrice: 0 } 
      ]);
    }
    setSearchQuery('');
    setSearchResults([]) 
  };

  const onSubmit = async(data:FormData) => {
    const allData = {...data, products:selectedProducts}
    console.log('Submitted Data:', allData);

    const response = await submitSale(allData);
    console.log(response);
    
    
    reset();
    setSelectedProducts([]);
  };

  return (
    <div className={styles.DistributorSalesContainer}>
      <h2>Sell Inventory</h2>
      <form className={styles.SalesForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.FormGroup}>
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            {...register('customerName', { required: true })}
          />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="customerMobileNumber">Customer Mobile Number:</label>
          <input
            type="text"
            id="customerMobileNumber"
            {...register('customerMobileNumber', { required: true })}
          />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="customerEmail">Customer Email:</label>
          <input
            type="email"
            id="customerEmail"
            {...register('customerEmail', { required: true })}
          />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="productSearch">Search Product:</label>
          <input
            type="text"
            id="productSearch"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by product name"
          />
          <ul className={styles.SearchResults}>
            {searchResults.map((item) => (
              <li key={item.product._id}>
                {item.product.productName}
                <button
                  // type="button"
                  className={styles.AddBtn}
                  onClick={() => handleAddProduct(item.product)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.SelectedProducts}>
          <h3>Selected Products</h3>
          <ul>
            {selectedProducts.map((product, index) => (
              <li className={styles.ListProduct} key={index}>
                <div className={styles.ProductName}>{product.productName}</div>
                
                <div className={styles.PQuantiy}>Quantity:
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    setSelectedProducts((prevProducts) =>
                      prevProducts.map((p, idx) =>
                        idx === index ? { ...p, quantity: parseInt(e.target.value, 10) } : p
                      )
                    )
                  }
                /></div> 
                <div className={styles.PriceQuanity}>Price:
                <input
                  type="number"
                  value={product.currentPrice}
                  onChange={(e) =>
                    setSelectedProducts((prevProducts) =>
                      prevProducts.map((p, idx) =>
                        idx === index ? { ...p, currentPrice: parseInt(e.target.value, 10) } : p
                      )
                    )
                  }
                /></div>
                 
              </li>
            ))}
          </ul>
        </div>
        <button className={styles.EditBtn}type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DistributorSales;












// import React, { useEffect, useReducer } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import styles from './DistributorSales.module.scss';
// import { FormData } from './DistributorSales.types';
// import { fetchDistributorInventory } from '../../services/DistributorProduct.services';
// import { Product } from '../ManufacturerProduct/ManufacturerProduct.types';
// import salesReducer, { initialSalesState } from './DistributorSales.state';
// // import salesReducer from './salesReducer'; // Import the reducer

// const initialFormState: FormData = {
//   customerName: '',
//   customerMobileNumber: '',
//   customerEmail: '',
//   products: [],
// };

// const DistributorSales = () => {
//   const { register, handleSubmit, reset } = useForm<FormData>({ defaultValues: initialFormState });
//   const [state, dispatch] = useReducer(salesReducer, initialSalesState);

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const fetchInventory = async () => {
//     const value = await fetchDistributorInventory();
//     dispatch({ type: 'FETCH_INVENTORY', payload: value.data });
//   };

//   const handleSearch = (query: string) => {
//     dispatch({ type: 'SEARCH_PRODUCTS', payload: query });
//   };

//   const handleAddProduct = (product: Product) => {
//     dispatch({ type: 'ADD_PRODUCT', payload: product });
//   };

//   const onSubmit: SubmitHandler<FormData> = (data) => {
//     const allData = { ...data, products: state.selectedProducts };
//     console.log('Submitted Data:', allData);

//     reset();
//     dispatch({ type: 'RESET_SELECTED_PRODUCTS' });
//   };

//   return (
//     <div className={styles.DistributorSalesContainer}>
//       <h2>Sell Inventory</h2>
//       <form className={styles.SalesForm} onSubmit={handleSubmit(onSubmit)}>
//         <div className={styles.FormGroup}>
//           <label htmlFor="customerName">Customer Name:</label>
//           <input
//             type="text"
//             id="customerName"
//             {...register('customerName', { required: true })}
//           />
//         </div>
//         <div className={styles.FormGroup}>
//           <label htmlFor="customerMobileNumber">Customer Mobile Number:</label>
//           <input
//             type="text"
//             id="customerMobileNumber"
//             {...register('customerMobileNumber', { required: true })}
//           />
//         </div>
//         <div className={styles.FormGroup}>
//           <label htmlFor="customerEmail">Customer Email:</label>
//           <input
//             type="email"
//             id="customerEmail"
//             {...register('customerEmail', { required: true })}
//           />
//         </div>
//         <div className={styles.FormGroup}>
//           <label htmlFor="productSearch">Search Product:</label>
//           <input
//             type="text"
//             id="productSearch"
//             value={state.searchQuery}
//             onChange={(e) => handleSearch(e.target.value)}
//             placeholder="Search by product name"
//           />
//           <ul className={styles.SearchResults}>
//             {state.searchResults.map((item) => (
//               <li key={item.product._id}>
//                 {item.product.productName}
//                 <button
//                   type="button"
//                   onClick={() => handleAddProduct(item)}
//                 >
//                   Add
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className={styles.SelectedProducts}>
//           <h3>Selected Products</h3>
//           <ul>
//             {state.selectedProducts.map((item, index) => (
//               <li key={index}>
//                 {item.product.productName} - Quantity:
//                 <input
//                   type="number"
//                   value={item.quantity}
//                   onChange={(e) =>
//                     dispatch({
//                       type: 'INCREMENT_QUANTITY',
//                       payload: item.product._id,
//                     })
//                   }
//                 />
//                 - Price:
//                 <input
//                   type="number"
//                   value={item.product.currentPrice}
//                   onChange={(e) =>
//                     dispatch({
//                       type: 'UPDATE_PRICE',
//                       payload: {
//                         productId: item.product._id,
//                         currentPrice: parseInt(e.target.value, 10),
//                       },
//                     })
//                   }
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default DistributorSales;


// const DistributorSales: React.FC = () => {
//   const { register, handleSubmit, reset } = useForm<FormData>();
//   const [state, dispatch] = useReducer(salesReducer, initialState);

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const fetchInventory = async () => {
//     const value = await fetchDistributorInventory();
//     dispatch({ type: 'SET_INVENTORY', payload: value.data });
//   };

//   const handleSearch = (query: string) => {
//     dispatch({ type: 'SET_SEARCH_QUERY', payload: query });

//     const results = state.inventory.filter((item) =>
//       item.product.productName.toLowerCase().includes(query.toLowerCase())
//     );

//     dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
//   };

//   const handleAddProduct = (product: Product) => {
//     dispatch({ type: 'ADD_PRODUCT', payload: product });
//     dispatch({ type: 'SET_SEARCH_QUERY', payload: '' }); // Clear search query after adding product
//   };

//   const onSubmit: SubmitHandler<FormData> = (data) => {
//     const allData = { ...data, products: state.selectedProducts };
//     console.log('Submitted Data:', allData);

//     reset();
//     dispatch({ type: 'RESET_FORM' });
//   };

//   return (
//     <div className={styles.DistributorSalesContainer}>
//       <h2>Sell Inventory</h2>
//       <form className={styles.SalesForm} onSubmit={handleSubmit(onSubmit)}>
//         <div className={styles.FormGroup}>
//           <label htmlFor="customerName">Customer Name:</label>
//           <input
//             type="text"
//             id="customerName"
//             {...register('customerName', { required: true })}
//           />
//         </div>
//         <div className={styles.FormGroup}>
//           <label htmlFor="customerMobileNumber">Customer Mobile Number:</label>
//           <input
//             type="text"
//             id="customerMobileNumber"
//             {...register('customerMobileNumber', { required: true })}
//           />
//         </div>
//         <div className={styles.FormGroup}>
//           <label htmlFor="customerEmail">Customer Email:</label>
//           <input
//             type="email"
//             id="customerEmail"
//             {...register('customerEmail', { required: true })}
//           />
//         </div>
//         <div className={styles.FormGroup}>
//           <label htmlFor="productSearch">Search Product:</label>
//           <input
//             type="text"
//             id="productSearch"
//             value={state.searchQuery}
//             onChange={(e) => handleSearch(e.target.value)}
//             placeholder="Search by product name"
//           />
//           <ul className={styles.SearchResults}>
//             {state.searchResults.map((item) => (
//               <li key={item.productId}>
//                 {item.productName}
//                 <button
//                   type="button"
//                   onClick={() => handleAddProduct(item)}
//                 >
//                   Add
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className={styles.SelectedProducts}>
//           <h3>Selected Products</h3>
//           <ul>
//             {state.selectedProducts.map((product, index:number) => (
//               <li key={index}>
//                 {product.productName} - Quantity:
//                 <input
//                   type="number"
//                   value={product.quantity}
//                   onChange={(e) =>
//                     dispatch({
//                       type: 'UPDATE_PRODUCT_QUANTITY',
//                       payload: { index, quantity: parseInt(e.target.value, 10) },
//                     })
//                   }
//                 />
//                 - Price:
//                 <input
//                   type="number"
//                   value={product.currentPrice}
//                   onChange={(e) =>
//                     dispatch({
//                       type: 'UPDATE_PRODUCT_PRICE',
//                       payload: { index, currentPrice: parseInt(e.target.value, 10) },
//                     })
//                   }
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default DistributorSales;








