

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './DistributorSales.module.scss';
import { FormData } from './DistributorSales.types';
import { fetchDistributorInventory, submitSale } from '../../services/DistributorProduct.services';
import { InventoryProduct } from '../ManufacturerInventory/ManufacturerInventory.types';
import { Product } from "../ManufacturerProduct/ManufacturerProduct.types";



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
    
    const resultArray = inventory.filter(item=>item.product!==null);
    const results =resultArray.filter((item) =>
      item.product.productName.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  

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
    const response = await submitSale(allData);
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
            {searchResults.filter(pro=>pro.product!==null).map((item) => (
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
                        idx === index ? { ...p, quantity: parseInt(e.target.value) } : p
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
                        idx === index ? { ...p, currentPrice: parseInt(e.target.value) } : p
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


// import { useEffect, useReducer } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import styles from './DistributorSales.module.scss';
// import { fetchDistributorInventory, submitSale } from '../../services/DistributorProduct.services';
// import { distributorSalesReducer, initialDistributorSalesState } from './DistributorSales.state';
// // import { distributorSalesSchema, DistributorSalesFormData } from './DistributorSales.validation';
// import { Product } from '../ManufacturerProduct/ManufacturerProduct.types';
// import { DistributorSalesFormData, distributorSalesSchema } from './DistributorSales.types';

// const DistributorSales = () => {
//   const [state, dispatch] = useReducer(distributorSalesReducer, initialDistributorSalesState);
//   const { register, handleSubmit, reset, control } = useForm<DistributorSalesFormData>({
//     resolver: zodResolver(distributorSalesSchema),
//   });

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const fetchInventory = async () => {
//     const value = await fetchDistributorInventory();
//     dispatch({ type: 'SET_INVENTORY', payload: value.data });
//   };

//   const handleSearch = (query: string) => {
//     dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
//     const resultArray = state.inventory.filter(item=>item.product!==null);
//     const results =resultArray.filter((item) =>
//       item.product.productName.toLowerCase().includes(query.toLowerCase())
//     );
//     dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
//   };

//   const handleAddProduct = (product: Product) => {
//     dispatch({ type: 'ADD_PRODUCT', payload: product });
//     dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
//     dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
//   };

//   const onSubmit = async (data: DistributorSalesFormData) => {
//     const allData = { ...data, products: state.selectedProducts };
//     const response = await submitSale(allData);
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
//             {...register('customerName')}
//           />
//         </div>
//         <div className={styles.FormGroup}>
//           <label htmlFor="customerMobileNumber">Customer Mobile Number:</label>
//           <input
//             type="text"
//             id="customerMobileNumber"
//             {...register('customerMobileNumber')}
//           />
//         </div>
//         <div className={styles.FormGroup}>
//           <label htmlFor="customerEmail">Customer Email:</label>
//           <input
//             type="email"
//             id="customerEmail"
//             {...register('customerEmail')}
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
//                   className={styles.AddBtn}
//                   onClick={() => handleAddProduct(item.product)}
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
//             {state.selectedProducts.map((product, index) => (
//               <li className={styles.ListProduct} key={index}>
//                 <div className={styles.ProductName}>{product.productName}</div>
//                 <div className={styles.PQuantity}>
//                   Quantity:
//                   <Controller
//                     control={control}
//                     name={`products.${index}.quantity` as const}
//                     render={({ field }) => (
//                       <input
//                         type="number"
//                         {...field}
//                         value={product.quantity}
//                         // min={1}
//                         onChange={(e) => {
//                           field.onChange(e);
//                           dispatch({
//                             type: 'UPDATE_PRODUCT_QUANTITY',
//                             payload: { index, quantity: Number(e.target.value) },
//                           });
//                         }}
//                       />
//                     )}
//                   />
//                 </div>
//                 <div className={styles.PriceQuantity}>
//                   Price:
//                   <Controller
//                     control={control}
//                     name={`products.${index}.currentPrice` as const}
//                     render={({ field }) => (
//                       <input
//                         type="number"
//                         {...field}
//                         value={product.currentPrice}
//                         min={0}
//                         onChange={(e) => {
//                           field.onChange(e);
//                           dispatch({
//                             type: 'UPDATE_PRODUCT_PRICE',
//                             payload: { index, currentPrice: Number(e.target.value) },
//                           });
//                         }}
//                       />
//                     )}
//                   />
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <button className={styles.EditBtn} type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default DistributorSales;

