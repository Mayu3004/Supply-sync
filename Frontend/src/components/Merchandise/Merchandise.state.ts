
import { MerchandiseData } from './Merchandise.types';

export interface MerchandiseState {
  merchandises: MerchandiseData[];
  modalOpen: boolean;
  selectedMerchandise: MerchandiseData | null;
  currentPage: number;
  totalPages: number;
}

export type MerchandiseAction =
  | { type: 'SET_MERCHANDISES'; payload: MerchandiseData[] }
  | { type: 'SET_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_SELECTED_MERCHANDISE'; payload: MerchandiseData | null }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_TOTAL_PAGES'; payload: number };

export const initialMerchandiseState: MerchandiseState = {
  merchandises: [],
  modalOpen: false,
  selectedMerchandise: null,
  currentPage: 1,
  totalPages: 10,
};

export const merchandiseReducer = (
  state: MerchandiseState,
  action: MerchandiseAction
): MerchandiseState => {
  switch (action.type) {
    case 'SET_MERCHANDISES':
      return { ...state, merchandises: action.payload };
    case 'SET_MODAL_OPEN':
      return { ...state, modalOpen: action.payload };
    case 'SET_SELECTED_MERCHANDISE':
      return { ...state, selectedMerchandise: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_TOTAL_PAGES':
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
};
