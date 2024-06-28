import React, { createContext, useReducer, ReactNode, useContext } from "react";
import { distributorReducer, initialDistributorState, DistributorState, DistributorAction } from "./Distributor.state";

interface DistributorProviderProps {
    children: ReactNode;
}

interface DistributorContextProps {
    state: DistributorState;
    dispatch: React.Dispatch<DistributorAction>;
}

export const DistributorContext = createContext<DistributorContextProps | undefined>(undefined);

const DistributorProvider = ({ children }: DistributorProviderProps) => {
    const [state, dispatch] = useReducer(distributorReducer, initialDistributorState);

    return (
        <DistributorContext.Provider value={{ state, dispatch }}>
            {children}
        </DistributorContext.Provider>
    );
};

const useDistributorContext = () => {
    const context = useContext(DistributorContext);
    if (context === undefined) {
        throw new Error('useManufacturerProductContext must be used within a ManufacturerProductProvider');
    }
    return context;
};

export { DistributorProvider, useDistributorContext };