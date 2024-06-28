// import { DistributorData } from "./Distributor.types";

// export interface DistributorState {
//     distributors: DistributorData[];
//     isModalAdd: boolean;
//     isModalUpdate: boolean;
//     isModalDelete: boolean;
//     selectedDistributorId: string | null;
//     selectedDistributor: DistributorData | null;
// }

// export type DistributorAction =
//     | { type: 'SET_DISTRIBUTORS'; payload: DistributorData[] }
//     | { type: 'SET_IS_MODAL_ADD'; payload: boolean }
//     | { type: 'SET_IS_MODAL_UPDATE'; payload: boolean }
//     | { type: 'SET_IS_MODAL_DELETE'; payload: boolean }
//     | { type: 'SET_SELECTED_DISTRIBUTOR_ID'; payload: string | null }
//     | { type: 'SET_SELECTED_DISTRIBUTOR'; payload: DistributorData | null };

// export const distributorReducer = (state: DistributorState, action: DistributorAction): DistributorState => {
//     switch (action.type) {
//         case 'SET_DISTRIBUTORS':
//             return { ...state, distributors: action.payload };
//         case 'SET_IS_MODAL_ADD':
//             return { ...state, isModalAdd: action.payload };
//         case 'SET_IS_MODAL_UPDATE':
//             return { ...state, isModalUpdate: action.payload };
//         case 'SET_IS_MODAL_DELETE':
//             return { ...state, isModalDelete: action.payload };
//         case 'SET_SELECTED_DISTRIBUTOR_ID':
//             return { ...state, selectedDistributorId: action.payload };
//         case 'SET_SELECTED_DISTRIBUTOR':
//             return { ...state, selectedDistributor: action.payload };
//         default:
//             return state;
//     }
// };

// export const initialDistributorState: DistributorState = {
//     distributors: [],
//     isModalAdd: false,
//     isModalUpdate: false,
//     isModalDelete: false,
//     selectedDistributorId: null,
//     selectedDistributor: null,
// };




import { DistributorData } from "./Distributor.types";

export interface DistributorState {
    distributors: DistributorData[];
    isModalAdd: boolean;
    isModalUpdate: boolean;
    isModalDelete: boolean;
    selectedDistributorId: string | null;
    selectedDistributor: DistributorData | null;
    currentPage: number;
    totalPages: number;
    refreshDistributors: boolean;
}

export type DistributorAction =
    | { type: 'SET_DISTRIBUTORS'; payload: DistributorData[] }
    | { type: 'SET_IS_MODAL_ADD'; payload: boolean }
    | { type: 'SET_IS_MODAL_UPDATE'; payload: boolean }
    | { type: 'SET_IS_MODAL_DELETE'; payload: boolean }
    | { type: 'SET_SELECTED_DISTRIBUTOR_ID'; payload: string | null }
    | { type: 'SET_SELECTED_DISTRIBUTOR'; payload: DistributorData | null }
    | { type: 'SET_CURRENT_PAGE'; payload: number }
    | { type: 'SET_TOTAL_PAGES'; payload: number }
    | { type: 'SET_REFRESH_DISTRIBUTORS'; payload: boolean };

export const distributorReducer = (state: DistributorState, action: DistributorAction): DistributorState => {
    switch (action.type) {
        case 'SET_DISTRIBUTORS':
            return { ...state, distributors: action.payload };
        case 'SET_IS_MODAL_ADD':
            return { ...state, isModalAdd: action.payload };
        case 'SET_IS_MODAL_UPDATE':
            return { ...state, isModalUpdate: action.payload };
        case 'SET_IS_MODAL_DELETE':
            return { ...state, isModalDelete: action.payload };
        case 'SET_SELECTED_DISTRIBUTOR_ID':
            return { ...state, selectedDistributorId: action.payload };
        case 'SET_SELECTED_DISTRIBUTOR':
            return { ...state, selectedDistributor: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'SET_TOTAL_PAGES':
            return { ...state, totalPages: action.payload };
        case 'SET_REFRESH_DISTRIBUTORS':
            return { ...state, refreshDistributors: action.payload };
        default:
            return state;
    }
};

export const initialDistributorState: DistributorState = {
    distributors: [],
    isModalAdd: false,
    isModalUpdate: false,
    isModalDelete: false,
    selectedDistributorId: null,
    selectedDistributor: null,
    currentPage: 1,
    totalPages: 10,
    refreshDistributors:false,
};

