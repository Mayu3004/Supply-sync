import { ProductData } from "./TopProductSales.types";


export interface TopProductSalesState {
    products: ProductData[];
    isFetched: boolean;
  }

  export type TopProductSalesAction =
  | { type: 'SET_PRODUCTS'; payload: ProductData[] }
  | { type: 'SET_IS_FETCHED'; payload: boolean };

  export const initialTopProductSalesState: TopProductSalesState = {
    products: [],
    isFetched: false,
  };

export const topProductSalesReducer = (state: TopProductSalesState, action: TopProductSalesAction): TopProductSalesState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    case 'SET_IS_FETCHED':
      return {
        ...state,
        isFetched: action.payload,
      };
    default:
      return state;
  }
};
