import React, { createContext, useReducer, useContext } from 'react';
import { MerchandiseState, MerchandiseAction, initialMerchandiseState, merchandiseReducer } from './Merchandise.state';

interface MerchandiseContextProps {
    state: MerchandiseState;
    dispatch: React.Dispatch<MerchandiseAction>;
}

const MerchandiseContext = createContext<MerchandiseContextProps | undefined>(undefined);

const MerchandiseProvider = ({ children }:React.ReactNode) => {
    const [state, dispatch] = useReducer(merchandiseReducer, initialMerchandiseState);

    return (
        <MerchandiseContext.Provider value={{ state, dispatch }}>
            {children}
        </MerchandiseContext.Provider>
    );
};

const useMerchandiseContext = () => {
    const context = useContext(MerchandiseContext);
    if (context === undefined) {
        throw new Error('useMerchandiseContext must be used within a MerchandiseProvider');
    }
    return context;
};

export { MerchandiseProvider, useMerchandiseContext };
