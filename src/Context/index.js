import { createContext, useState } from "react";
export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const localStorageSt = JSON.parse(localStorage.getItem("students")) || [];

    const [students, setStudents] = useState(localStorageSt);
    const [search, setSearch] = useState("");

    const value = { students, setStudents, search, setSearch };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
