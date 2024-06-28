
// import { Product } from "../ManufacturerProduct/ManufacturerProduct.types";
// import { FormData ,InventoryProduct} from "./DistributorSales.types";
// interface State {
//   inventory: InventoryProduct[];
//   searchQuery: string;
//   searchResults: InventoryProduct[];
//   selectedProducts: FormData['products'];
// }

// export type Action =
//   | { type: 'SET_INVENTORY'; payload: InventoryProduct[] }
//   | { type: 'SET_SEARCH_QUERY'; payload: string }
//   | { type: 'SET_SEARCH_RESULTS'; payload: InventoryProduct[] }
//   | { type: 'ADD_PRODUCT'; payload: Product }
//   | { type: 'UPDATE_PRODUCT_QUANTITY'; payload: { index: number; quantity: number } }
//   | { type: 'UPDATE_PRODUCT_PRICE'; payload: { index: number; currentPrice: number } }
//   | { type: 'RESET_FORM' };

// export const initialState: State = {
//   inventory: [],
//   searchQuery: '',
//   searchResults: [],
//   selectedProducts: [],
// };

// export const salesReducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case 'SET_INVENTORY':
//       return { ...state, inventory: action.payload };

//     case 'SET_SEARCH_QUERY':
//       return { ...state, searchQuery: action.payload };

//     case 'SET_SEARCH_RESULTS':
//       return { ...state, searchResults: action.payload };

//     case 'ADD_PRODUCT':
//       const { _id, productName } = action.payload;
//       const existingProduct = state.selectedProducts.find((p) => p.productId === _id);
//       if (existingProduct) {
//         return {
//           ...state,
//           selectedProducts: state.selectedProducts.map((p) =>
//             p.productId === _id ? { ...p, quantity: p.quantity + 1 } : p
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           selectedProducts: [
//             ...state.selectedProducts,
//             { productId:_id, productName, quantity: 1, currentPrice: 0 },
//           ],
//         };
//       }

//     case 'UPDATE_PRODUCT_QUANTITY':
//       return {
//         ...state,
//         selectedProducts: state.selectedProducts.map((p, index) =>
//           index === action.payload.index ? { ...p, quantity: action.payload.quantity } : p
//         ),
//       };

//     case 'UPDATE_PRODUCT_PRICE':
//       return {
//         ...state,
//         selectedProducts: state.selectedProducts.map((p, index) =>
//           index === action.payload.index ? { ...p, currentPrice: action.payload.currentPrice } : p
//         ),
//       };

//     case 'RESET_FORM':
//       return { ...initialState, inventory: state.inventory }; // Resetting to initial state, keeping inventory data

//     default:
//       return state;
//   }
// };


import { InventoryProduct } from '../ManufacturerInventory/ManufacturerInventory.types';
import { Product } from "../ManufacturerProduct/ManufacturerProduct.types";

interface SelectedProduct {
  productId: string;
  productName: string;
  quantity: number;
  currentPrice: number;
}

export interface DistributorSalesState {
  inventory: InventoryProduct[];
  searchQuery: string;
  searchResults: InventoryProduct[];
  selectedProducts: SelectedProduct[];
}

export type DistributorSalesAction =
  | { type: 'SET_INVENTORY'; payload: InventoryProduct[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SEARCH_RESULTS'; payload: InventoryProduct[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT_QUANTITY'; payload: { index: number; quantity: number } }
  | { type: 'UPDATE_PRODUCT_PRICE'; payload: { index: number; currentPrice: number } }
  | { type: 'RESET_SELECTED_PRODUCTS' };

export const initialDistributorSalesState: DistributorSalesState = {
  inventory: [],
  searchQuery: '',
  searchResults: [],
  selectedProducts: [],
};

export const distributorSalesReducer = (
  state: DistributorSalesState,
  action: DistributorSalesAction
): DistributorSalesState => {
  switch (action.type) {
    case 'SET_INVENTORY':
      return { ...state, inventory: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'ADD_PRODUCT':
      const existingProduct = state.selectedProducts.find(
        (p) => p.productId === action.payload._id
      );
      if (existingProduct) {
        return {
          ...state,
          selectedProducts: state.selectedProducts.map((p) =>
            p.productId === action.payload._id
              ? { ...p, quantity: p.quantity + 1 }
              : p
          ),
        };
      } else {
        return {
          ...state,
          selectedProducts: [
            ...state.selectedProducts,
            {
              productId: action.payload._id,
              productName: action.payload.productName,
              quantity: 1,
              currentPrice: 0,
            },
          ],
        };
      }
    case 'UPDATE_PRODUCT_QUANTITY':
      return {
        ...state,
        selectedProducts: state.selectedProducts.map((p, idx) =>
          idx === action.payload.index
            ? { ...p, quantity: action.payload.quantity }
            : p
        ),
      };
    case 'UPDATE_PRODUCT_PRICE':
      return {
        ...state,
        selectedProducts: state.selectedProducts.map((p, idx) =>
          idx === action.payload.index
            ? { ...p, currentPrice: action.payload.currentPrice }
            : p
        ),
      };
    case 'RESET_SELECTED_PRODUCTS':
      return { ...state, selectedProducts: [] };
    default:
      return state;
  }
};
