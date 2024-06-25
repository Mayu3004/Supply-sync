

import { Order, Distributor, Product } from "./ProductOrders.types";

type State = {
  orders: Order[];
  distributors: Distributor[];
  products: Product[];
  status: 'pending' | 'completed';
};

type Action =
  | { type: 'FETCH_ORDERS_SUCCESS'; payload: Order[] }
  | { type: 'FETCH_DISTRIBUTORS_SUCCESS'; payload: Distributor[] }
  | { type: 'FETCH_PRODUCTS_SUCCESS'; payload: Product[] }
  | { type: 'COMPLETE_ORDER'; payload: string }
  | { type: 'SET_STATUS'; payload: 'pending' | 'completed' };

export const initialState: State = {
  orders: [],
  distributors: [],
  products: [],
  status: 'pending',
};

export const ordersReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.payload,
      };
    case 'FETCH_DISTRIBUTORS_SUCCESS':
      return {
        ...state,
        distributors: action.payload,
      };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: action.payload,
      };
    case 'COMPLETE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.payload ? { ...order, status: 'completed' } : order
        ),
      };
    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
