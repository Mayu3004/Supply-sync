import React, { createContext, useReducer, useContext } from 'react';
import { OrderAction, OrderState, initialState, ordersReducer } from './ProductOrderReducer';

const ProductOrderContext = createContext<{
    state: OrderState
    dispatch: React.Dispatch<OrderAction>;
} | undefined>(undefined);

const ProductOrderProvider = ({ children }:React.ReactNode) => {
    const [state, dispatch] = useReducer(ordersReducer, initialState);

    return (
        <ProductOrderContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductOrderContext.Provider>
    );
};

const useProductOrderContext = () => {
    const context = useContext(ProductOrderContext);
    if (context === undefined) {
        throw new Error('useManufacturerProductContext must be used within a ManufacturerProductProvider');
    }
    return context;
};

export { ProductOrderProvider, useProductOrderContext };
