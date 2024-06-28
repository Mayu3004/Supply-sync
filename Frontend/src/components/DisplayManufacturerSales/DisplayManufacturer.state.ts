import { SalesData } from "./DisplayManufacturerSales.types";

export interface SalesState {
    sales: SalesData[];
    isFetched: boolean;
  }


  type SalesAction =
  |{type: "SET_SALES";payload:SalesData[]}
  |{type:"SET_IS_FETCHED";payload:boolean};
  

  export const initialSalesState: SalesState = {
    sales: [],
    isFetched: false,
  };
export const salesReducer = (state: SalesState , action: SalesAction): SalesState => {
  switch (action.type) {
    case "SET_SALES":
      return {
        ...state,
        sales: action.payload,
      };
    case "SET_IS_FETCHED":
      return {
        ...state,
        isFetched: action.payload,
      };
    default:
      return state;
  }
};
