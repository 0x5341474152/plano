import React, { createContext, useContext, useReducer } from 'react';
import { BroReducer } from '../reducer/broreducer';

// Initial state
const init = { 
    name: "",
    time: "",
    message: "",
    task: null
};

// Create context
const BroContext = createContext(init);

// Create provider component
const BroProvider = ({ children }) => {
    const [{name, time, message, task}, Brodispatch] = useReducer(BroReducer, init);

    return (
        <BroContext.Provider value={{ name,time,message,task, Brodispatch }}>
            {children}
        </BroContext.Provider>
    );
};

// Custom hook to use the Brocon context
const useBro = () => useContext(BroContext);

export { useBro, BroProvider };
