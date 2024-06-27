
import { Product } from './ManufacturerProduct.types';

export interface ManufacturerProductState {
    isModalAdd: boolean;
    isModalUpdate: boolean;
    isModalDelete: boolean;
    selectedProductId: string | null;
    selectedProduct: Product | null;
    refreshProducts:boolean;
    products: Product[];
    currentPage: number;
    totalPages: number;
}

export type ManufacturerProductAction =
    | { type: 'SET_MODAL_ADD'; payload: boolean }
    | { type: 'SET_MODAL_UPDATE'; payload: { isOpen: boolean, product: Product | null, productId: string | null } }
    | { type: 'SET_MODAL_DELETE'; payload: { isOpen: boolean, productId: string | null } }
    | { type: 'SET_PRODUCTS'; payload: Product[] }
    | { type: 'SET_CURRENT_PAGE'; payload: number }
    | { type: 'SET_TOTAL_PAGES'; payload: number }
    |{type:'SET_REFRESH_PRODUCTS';payload:boolean}

export const initialManufacturerProductState: ManufacturerProductState = {
    isModalAdd: false,
    isModalUpdate: false,
    isModalDelete: false,
    selectedProductId: null,
    selectedProduct: null,
    refreshProducts: false,
    products: [],
    currentPage: 1,
    totalPages: 10
};

export const manufacturerProductReducer = (
    state: ManufacturerProductState,
    action: ManufacturerProductAction
): ManufacturerProductState => {
    switch (action.type) {
        case 'SET_MODAL_ADD':
            return { ...state, isModalAdd: action.payload };
        case 'SET_MODAL_UPDATE':
            return { ...state, isModalUpdate: action.payload.isOpen, selectedProduct: action.payload.product, selectedProductId: action.payload.productId };
        case 'SET_MODAL_DELETE':
            return { ...state, isModalDelete: action.payload.isOpen, selectedProductId: action.payload.productId };
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'SET_TOTAL_PAGES':
            return { ...state, totalPages: action.payload };
            case 'SET_REFRESH_PRODUCTS':
                return { ...state, refreshProducts: action.payload };
        default:
            return state;
    }
};
