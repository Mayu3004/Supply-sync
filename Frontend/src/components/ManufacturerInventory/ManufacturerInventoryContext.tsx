
import React, { createContext, useReducer, useContext } from 'react';
import { ManufacturerInventoryState, ManufacturerInventoryAction, initialManufacturerInventoryState, manufacturerInventoryReducer } from './ManufacturerInventory.state';

interface ManufacturerInventoryContextProps {
    state: ManufacturerInventoryState;
    dispatch: React.Dispatch<ManufacturerInventoryAction>;
}

const ManufacturerInventoryContext = createContext<ManufacturerInventoryContextProps | undefined>(undefined);

const ManufacturerInventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(manufacturerInventoryReducer, initialManufacturerInventoryState);

    return (
        <ManufacturerInventoryContext.Provider value={{ state, dispatch }}>
            {children}
        </ManufacturerInventoryContext.Provider>
    );
};

const useManufacturerInventoryContext = () => {
    const context = useContext(ManufacturerInventoryContext);
    if (context === undefined) {
        throw new Error('useManufacturerInventoryContext must be used within a ManufacturerInventoryProvider');
    }
    return context;
};

export { ManufacturerInventoryProvider, useManufacturerInventoryContext };
