import { createContext, useContext } from "react";
import { useState } from "react";

const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("AppContext must be within appContextProvider");
  return context;
};

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const setCurrentUser = (user) => {
    setUser(user);
  };
  return (
    <AppContext.Provider value={{ user, setCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
