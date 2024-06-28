
import { PerformerData } from "./TopPerformers.types";
export interface TopPerformersState {
    performers: PerformerData[];
    isFetched: boolean;
  }


  type TopPerformersAction =
  |{type: "SET_PERFORMERS";payload:PerformerData[]}
  |{type:"SET_IS_FETCHED";payload:boolean};
  

  export const initialTopPerformersState: TopPerformersState = {
    performers: [],
    isFetched: false,
  };
export const topPerformersReducer = (state: TopPerformersState = initialTopPerformersState, action: TopPerformersAction): TopPerformersState => {
  switch (action.type) {
    case "SET_PERFORMERS":
      return {
        ...state,
        performers: action.payload,
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
