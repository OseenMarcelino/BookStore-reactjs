import { createContext, useContext, useState } from "react";

export const UserContext = createContext("");

export const AppWrapper = ({ children }) => {
    const [userName, setUserName] = useState("")

    return (
        <div>
            <UserContext.Provider value={{ userName, setUserName }}>
                {children}
            </UserContext.Provider>
        </div>
    )
}

export const useUserContext = () => useContext(UserContext);