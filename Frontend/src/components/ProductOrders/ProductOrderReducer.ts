

import { Order, } from "./ProductOrders.types";

export type OrderState = {
  orders: Order[];
  status: 'pending' | 'completed';
  currentPage: number;
  totalPages: number;
};

export type OrderAction =
  | { type: 'FETCH_ORDERS_SUCCESS'; payload: { orders: Order[]; totalPages: number } }
  | { type: 'COMPLETE_ORDER'; payload: string }
  | { type: 'SET_STATUS'; payload: 'pending' | 'completed' }
  | { type: 'SET_CURRENT_PAGE'; payload: number };

export const initialState: OrderState = {
  orders: [],
  status: 'pending',
  currentPage: 1,
  totalPages: 10, // Example initial total pages
};

export const ordersReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.payload.orders,
        totalPages: action.payload.totalPages,
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
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

