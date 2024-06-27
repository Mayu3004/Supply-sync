import React, { createContext, useReducer, useContext } from 'react';
import { ManufacturerProductAction, ManufacturerProductState, initialManufacturerProductState, manufacturerProductReducer } from './Manufacturer.state';

const ManufacturerProductContext = createContext<{
    state: ManufacturerProductState;
    dispatch: React.Dispatch<ManufacturerProductAction>;
} | undefined>(undefined);

const ManufacturerProductProvider = ({ children }:React.ReactNode) => {
    const [state, dispatch] = useReducer(manufacturerProductReducer, initialManufacturerProductState);

    return (
        <ManufacturerProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ManufacturerProductContext.Provider>
    );
};

const useManufacturerProductContext = () => {
    const context = useContext(ManufacturerProductContext);
    if (context === undefined) {
        throw new Error('useManufacturerProductContext must be used within a ManufacturerProductProvider');
    }
    return context;
};

export { ManufacturerProductProvider, useManufacturerProductContext };
