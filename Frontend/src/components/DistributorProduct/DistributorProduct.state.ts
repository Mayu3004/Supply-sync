
import { InventoryProduct } from "../ManufacturerInventory/ManufacturerInventory.types";
import { Product } from "../ManufacturerProduct/ManufacturerProduct.types";

export interface CartItem {
    product: InventoryProduct['product'];
    quantity: number;
}

export interface DistributorInventoryState {
    products: InventoryProduct[];
    cart: CartItem[];
    isModalOpen: boolean;
}

export type DistributorInventoryAction =
    | { type: 'SET_PRODUCTS'; payload: InventoryProduct[] }
    | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
    | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'OPEN_MODAL' }
    | { type: 'CLOSE_MODAL' };

export const initialDistributorInventoryState: DistributorInventoryState = {
    products: [],
    cart: [],
    isModalOpen: false,
};

export const distributorInventoryReducer = (
    state: DistributorInventoryState,
    action: DistributorInventoryAction
): DistributorInventoryState => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'ADD_TO_CART':
            const existingCartItem = state.cart.find(
                item => item.product._id === action.payload.product._id
            );

            if (existingCartItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.product._id === action.payload.product._id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    )
                };
            }

            return {
                ...state,
                cart: [...state.cart, { product: action.payload.product, quantity: action.payload.quantity }]
            };
        case 'UPDATE_CART_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.product._id === action.payload.productId
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            };
        case 'OPEN_MODAL':
            return {
                ...state,
                isModalOpen: true
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                isModalOpen: false
            };

        default:
            return state;
    }
};






