import { MerchandiseData } from "../Merchandise/Merchandise.types";

export interface MerchandiseState {
    merchandises: MerchandiseData[];
    currentPage: number;
    totalPages: number;
    status: string;
}

export const initialState: MerchandiseState = {
    merchandises: [],
    currentPage: 1,
    totalPages: 10,
    status: "pending",
};

type MerchandiseAction =
    | { type: "SET_MERCHANDISES"; payload: MerchandiseData[] }
    | { type: "SET_CURRENT_PAGE"; payload: number }
    | { type: "SET_TOTAL_PAGES"; payload: number }
    | { type: "SET_STATUS"; payload: string };


export const merchandiseRequestReducer = (state: MerchandiseState, action: MerchandiseAction): MerchandiseState => {
    switch (action.type) {
        case "SET_MERCHANDISES":
            return { ...state, merchandises: action.payload };
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.payload };
        case "SET_TOTAL_PAGES":
            return { ...state, totalPages: action.payload };
        case "SET_STATUS":
            return { ...state, status: action.payload };
        default:
            return state;
    }
};