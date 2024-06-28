
import { createContext, useReducer, ReactNode, useContext } from "react";
import { distributorInventoryReducer, initialDistributorInventoryState, DistributorInventoryState, DistributorInventoryAction } from "./DistributorProduct.state";


const DistributorProductContext = createContext<{ state: DistributorInventoryState; dispatch: React.Dispatch<DistributorInventoryAction> } | undefined>(undefined);


export const DistributorProductProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(distributorInventoryReducer, initialDistributorInventoryState);

    return (
        <DistributorProductContext.Provider value={{ state, dispatch }}>
            {children}
        </DistributorProductContext.Provider>
    );
};

export const useDistributorProduct = () => {
    const context = useContext(DistributorProductContext);
    if (context === undefined) {
        throw new Error("useDistributorProduct must be used within a DistributorProductProvider");
    }
    return context;
};
