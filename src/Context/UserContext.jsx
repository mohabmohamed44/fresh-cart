import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(); // Use UserContext directly

export function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));


  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}
