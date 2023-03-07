import React, { createContext } from "react";
import { BrowserRouter } from 'react-router-dom'

export const RouterContext = createContext({});

export const RouterProvider = ({ children }) => {
    return (
        <BrowserRouter>
            <RouterContext.Provider value={{}}>
                {children}
            </RouterContext.Provider>
        </BrowserRouter>
    )
}