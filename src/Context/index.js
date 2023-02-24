import { createContext, useState } from "react";
export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const localStorageSt = JSON.parse(localStorage.getItem("students")) || [];

    const [students, setStudents] = useState(localStorageSt);

    const value = { students, setStudents };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
