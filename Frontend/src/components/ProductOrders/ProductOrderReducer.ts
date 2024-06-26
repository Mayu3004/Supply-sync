

import { Order, } from "./ProductOrders.types";

type State = {
  orders: Order[];
  status: 'pending' | 'completed';
};

type Action =
  | { type: 'FETCH_ORDERS_SUCCESS'; payload: Order[] }
  | { type: 'COMPLETE_ORDER'; payload: string }
  | { type: 'SET_STATUS'; payload: 'pending' | 'completed' };

export const initialState: State = {
  orders: [],
  status: 'pending',
};

export const ordersReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.payload,
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
